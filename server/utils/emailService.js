const nodemailer = require('nodemailer');
const { EmailSettings } = require('../models');

function toBool(value, defaultValue = false) {
  if (value === undefined || value === null || value === '') return defaultValue;
  if (typeof value === 'boolean') return value;
  return String(value).toLowerCase() === 'true';
}

function normalizeSmtpError(error) {
  const authFailed = error?.code === 'EAUTH' || error?.responseCode === 535;
  if (authFailed) {
    const friendly = new Error('SMTP authentication failed. Check username/password');
    friendly.code = 'SMTP_AUTH_FAILED';
    friendly.cause = error;
    return friendly;
  }
  return error;
}

async function getSMTPConfig() {
  const settings = await EmailSettings.findOne({ where: { isActive: true } });

  const dbHost = settings?.smtpHost;
  const dbPort = settings?.smtpPort;
  const dbUser = settings?.smtpUser;
  const dbPass = settings?.smtpPassword;
  const dbSecure = settings?.smtpSecure;

  if (dbHost && dbPort && dbUser && dbPass) {
    console.log('[Email] Using SMTP from DB');
    return {
      source: 'db',
      smtpHost: dbHost,
      smtpPort: Number(dbPort),
      smtpUser: dbUser,
      smtpPass: dbPass,
      smtpSecure: toBool(dbSecure, Number(dbPort) === 465),
      settings,
    };
  }

  console.log('[Email] Using SMTP from ENV');
  const envHost = process.env.SMTP_HOST || 'smtp.zoho.in';
  const envPort = Number(process.env.SMTP_PORT || 465);
  const envUser = process.env.SMTP_USER;
  const envPass = process.env.SMTP_PASS;
  const envSecure = toBool(process.env.SMTP_SECURE, envPort === 465);

  return {
    source: 'env',
    smtpHost: envHost,
    smtpPort: envPort,
    smtpUser: envUser,
    smtpPass: envPass,
    smtpSecure: envSecure,
    settings,
  };
}

async function createTransporter() {
  const config = await getSMTPConfig();

  if (!config.smtpHost || !config.smtpPort || !config.smtpUser || !config.smtpPass) {
    throw new Error('SMTP not configured. Please configure SMTP in CMS or environment variables.');
  }

  console.log('[Email] SMTP config:', {
    source: config.source,
    host: config.smtpHost,
    port: config.smtpPort,
    user: config.smtpUser,
    secure: config.smtpSecure,
    passSet: Boolean(config.smtpPass),
  });

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort),
    secure: toBool(config.smtpSecure, Number(config.smtpPort) === 465),
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  try {
    await transporter.verify();
    console.log('[Email] SMTP transporter verified successfully');
  } catch (error) {
    console.error('[Email] SMTP transporter verification failed:', error.message);
    throw normalizeSmtpError(error);
  }

  return { transporter, config };
}

async function initializeEmailService() {
  try {
    const { transporter } = await createTransporter();
    console.log('✅ Email service initialized successfully');
    return transporter;
  } catch (error) {
    console.error('❌ Error initializing email service:', error.message);
    return null;
  }
}

async function sendTestEmail(testEmail) {
  try {
    const { transporter, config } = await createTransporter();
    const fromName = config.settings?.fromName || '3i MedTech Website';

    const mailOptions = {
      from: `"${fromName}" <${config.smtpUser}>`,
      to: testEmail,
      subject: 'Test Email from 3i MedTech CMS',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email from the 3i MedTech CMS email settings.</p>
        <p>If you received this email, your SMTP configuration is working correctly!</p>
        <hr>
        <p><small>Sent from 3i MedTech CMS at ${new Date().toLocaleString()}</small></p>
      `,
      text: `
Test Email

This is a test email from the 3i MedTech CMS email settings.

If you received this email, your SMTP configuration is working correctly!

---
Sent from 3i MedTech CMS at ${new Date().toLocaleString()}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    const normalized = normalizeSmtpError(error);
    console.error('❌ Error sending test email:', normalized.message);
    throw normalized;
  }
}

async function sendContactFormEmail(formData) {
  try {
    const settings = await EmailSettings.findOne({ where: { isActive: true } });
    if (!settings?.toEmail) {
      throw new Error('Recipient email not configured');
    }

    const { transporter, config } = await createTransporter();
    const fromName = settings.fromName || '3i MedTech Website';

    const mailOptions = {
      from: `"${fromName}" <${config.smtpUser}>`,
      to: settings.toEmail,
      subject: `New Contact Form Submission - ${formData.inquiry || 'General Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.fname}</p>
        <p><strong>Organization:</strong> ${formData.organization}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Company Size:</strong> ${formData.companySize}</p>
        <p><strong>Inquiry Type:</strong> ${formData.inquiry}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted from 3i MedTech website contact form</small></p>
      `,
      text: `
New Contact Form Submission

Name: ${formData.fname}
Organization: ${formData.organization}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company Size: ${formData.companySize}
Inquiry Type: ${formData.inquiry}

Message:
${formData.message}

---
Submitted from 3i MedTech website contact form
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact form email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    const normalized = normalizeSmtpError(error);
    console.error('❌ Error sending contact form email:', normalized.message);
    throw normalized;
  }
}

async function refreshEmailService() {
  return await initializeEmailService();
}

module.exports = {
  initializeEmailService,
  sendContactFormEmail,
  sendTestEmail,
  refreshEmailService,
};

