const { EmailSettings } = require("../models");
const status = require("../helpers/response");
const { refreshEmailService } = require("../utils/emailService");

function asyncHandler(fn) {
  return (req, res) => fn(req, res).catch((e) => status.responseStatus(res, 500, "Internal error", { error: e.message }));
}

exports.emailSettings = {
  get: asyncHandler(async (req, res) => {
    const settings = await EmailSettings.findOne({ where: { isActive: true } });
    // Don't send password in response for security
    if (settings) {
      const safeSettings = settings.toJSON();
      safeSettings.smtpPassword = safeSettings.smtpPassword ? '***' : null;
      return status.responseStatus(res, 200, "OK", safeSettings);
    }
    return status.responseStatus(res, 200, "OK", null);
  }),
  upsert: asyncHandler(async (req, res) => {
    const payload = req.body || {};
    const userId = req.userData?.id || null;
    
    console.log('📧 ========== Email Settings Update Request ==========');
    console.log('📧 Request method:', req.method);
    console.log('📧 Request path:', req.path);
    console.log('📧 User ID:', userId);
    console.log('📧 Payload received:', {
      hasPassword: !!payload.smtpPassword,
      passwordLength: payload.smtpPassword?.length,
      passwordIsMasked: payload.smtpPassword === '***',
      smtpHost: payload.smtpHost,
      smtpPort: payload.smtpPort,
      smtpUser: payload.smtpUser,
      fromEmail: payload.fromEmail,
      toEmail: payload.toEmail,
      fromName: payload.fromName,
      isActive: payload.isActive
    });
    
    const existing = await EmailSettings.findOne({ where: { isActive: true } });
    console.log('📧 Existing settings found:', existing ? 'Yes (ID: ' + existing.id + ')' : 'No');
    
    if (existing) {
      // If password is masked (***) or empty, don't update it
      if (payload.smtpPassword === '***' || payload.smtpPassword === '' || !payload.smtpPassword) {
        delete payload.smtpPassword;
        console.log('🔒 Keeping existing password (not updating)');
      } else {
        console.log('🔑 Updating password');
      }
      
      console.log('📧 Updating database with payload:', {
        ...Object.keys(payload).reduce((acc, key) => {
          if (key !== 'smtpPassword') acc[key] = payload[key];
          return acc;
        }, {}),
        hasPassword: !!payload.smtpPassword
      });
      
      await existing.update(payload);
      const updated = await EmailSettings.findByPk(existing.id);
      
      console.log('📧 Database update completed. Updated values:', {
        smtpHost: updated.smtpHost,
        smtpPort: updated.smtpPort,
        smtpUser: updated.smtpUser,
        fromEmail: updated.fromEmail,
        toEmail: updated.toEmail,
        fromName: updated.fromName,
        isActive: updated.isActive
      });
      
      // Refresh email service with new settings
      try {
        await refreshEmailService();
        console.log('✅ Email service refreshed');
      } catch (refreshError) {
        console.error('⚠️ Warning: Email service refresh failed:', refreshError.message);
        // Don't fail the update if refresh fails, but log it
      }
      
      // Don't send password in response
      const safeSettings = updated.toJSON();
      safeSettings.smtpPassword = safeSettings.smtpPassword ? '***' : null;
      console.log('📧 ========== Email Settings Update SUCCESS ==========');
      return status.responseStatus(res, 200, "Updated", safeSettings);
    }
    
    // Create new settings
    if (!payload.smtpPassword || payload.smtpPassword === '***') {
      return status.responseStatus(res, 400, "Password is required for new email settings");
    }
    
    const created = await EmailSettings.create(payload);
    
    // Initialize email service with new settings
    try {
      await refreshEmailService();
      console.log('✅ Email service initialized');
    } catch (refreshError) {
      console.error('⚠️ Warning: Email service initialization failed:', refreshError.message);
    }
    
    // Don't send password in response
    const safeSettings = created.toJSON();
    safeSettings.smtpPassword = safeSettings.smtpPassword ? '***' : null;
    return status.responseStatus(res, 201, "Created", safeSettings);
  }),
  test: asyncHandler(async (req, res) => {
    const { testEmail } = req.body;
    if (!testEmail) {
      return status.responseStatus(res, 400, "Test email address is required");
    }

    const { sendTestEmail } = require("../utils/emailService");
    
    try {
      await sendTestEmail(testEmail);
      return status.responseStatus(res, 200, "Test email sent successfully");
    } catch (error) {
      console.error('Test email error:', error);
      return status.responseStatus(res, 500, "Failed to send test email", { error: error.message });
    }
  }),
};

