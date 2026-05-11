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
        <p><strong>City:</strong> ${formData.city || 'Not provided'}</p>
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
City: ${formData.city || 'Not provided'}
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

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendContactAutoReplyEmail(formData) {
  try {
    const { transporter, config } = await createTransporter();
    const settings = await EmailSettings.findOne({ where: { isActive: true } });

    const customerEmail = formData?.email;
    if (!customerEmail) {
      throw new Error('Customer email not provided');
    }

    const fromName = settings?.fromName || '3iMedtech';
    const replyTo = settings?.toEmail || config.smtpUser;

    const name = formData?.fname || formData?.name || 'there';
    const product = formData?.product || '';
    const organization = formData?.organization || formData?.company || '';
    const city = formData?.city || '';
    const phone = formData?.phone || '';
    const inquiry = formData?.inquiry || formData?.enquiry || formData?.enquiringFor || '';
    const message = formData?.message || '';

    const subject = 'We received your enquiry - 3iMedtech';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111827;">
        <h2 style="margin: 0 0 12px 0; font-size: 20px; color: #2563EB;">Thanks for contacting 3iMedtech</h2>
        <p style="margin: 0 0 12px 0; line-height: 1.6;">Hi ${escapeHtml(name)},</p>
        <p style="margin: 0 0 12px 0; line-height: 1.6;">
          We’ve received your enquiry and our team will get back to you shortly.
        </p>
        ${(organization || city || product || phone || inquiry || message) ? `
          <div style="margin-top: 12px; padding: 14px 16px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 10px;">
            ${organization ? `<p style="margin: 0 0 6px 0; line-height: 1.6;"><strong>Organization:</strong> ${escapeHtml(organization)}</p>` : ''}
            ${city ? `<p style="margin: 0 0 6px 0; line-height: 1.6;"><strong>City:</strong> ${escapeHtml(city)}</p>` : ''}
            ${phone ? `<p style="margin: 0 0 6px 0; line-height: 1.6;"><strong>Contact:</strong> ${escapeHtml(phone)}</p>` : ''}
            ${inquiry ? `<p style="margin: 0 0 6px 0; line-height: 1.6;"><strong>Enquiry type:</strong> ${escapeHtml(inquiry)}</p>` : ''}
            ${product ? `<p style="margin: 0; line-height: 1.6;"><strong>Product:</strong> ${escapeHtml(product)}</p>` : ''}
            ${message ? `<p style="margin: 8px 0 0 0; line-height: 1.6; white-space: pre-wrap;"><strong>Message:</strong><br/>${escapeHtml(message)}</p>` : ''}
          </div>
        ` : ''}
        <p style="margin: 18px 0 0 0; font-size: 12px; color: #6B7280; line-height: 1.6;">
          If you didn’t submit this request, you can ignore this email.
        </p>
        <p style="margin: 18px 0 0 0; font-size: 12px; color: #6B7280; line-height: 1.6;">
          Regards,<br/>3iMedtech Team
        </p>
      </div>
    `;

    const text = `Hi ${name},\n\nWe’ve received your enquiry and our team will get back to you shortly.\n\nYour enquiry details:\n${organization ? `- Organization: ${organization}\n` : ''}${city ? `- City: ${city}\n` : ''}${phone ? `- Contact: ${phone}\n` : ''}${inquiry ? `- Enquiry type: ${inquiry}\n` : ''}${product ? `- Product: ${product}\n` : ''}${message ? `- Message: ${message}\n` : ''}\nRegards,\n3iMedtech Team`;

    const mailOptions = {
      from: `"${fromName}" <${config.smtpUser}>`,
      to: customerEmail,
      replyTo,
      subject,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact auto-reply sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    const normalized = normalizeSmtpError(error);
    console.error('❌ Error sending contact auto-reply:', normalized.message);
    throw normalized;
  }
}

async function refreshEmailService() {
  return await initializeEmailService();
}

module.exports = {
  initializeEmailService,
  sendContactFormEmail,
  sendContactAutoReplyEmail,
  sendTestEmail,
  refreshEmailService,
};

