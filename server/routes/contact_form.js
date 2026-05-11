const express = require('express');
const router = express.Router();
const { sendContactFormEmail, sendContactAutoReplyEmail } = require('../utils/emailService');
const status = require('../helpers/response');
const { getRequestMeta, phoneToDigitsOnly } = require('../helpers/requestMeta');
const { sendToKissflowWebhook } = require('../helpers/kissflowWebhook');

const WEBSITE_NAME = '3iMedtech';

function handleContactSubmit(req, res) {
  (async () => {
    try {
      const formData = req.body || {};
      const name = formData.fname || formData.name || '';
      const email = formData.email || '';
      const organization = formData.organization || formData.company || '';
      const city = formData.city || '';
      const product = formData.product || '';
      const message = formData.message || '';

      // Validate required fields
      if (!name || !email || !organization || !city || !product || !message) {
        return status.responseStatus(res, 400, 'Missing required fields');
      }

      // Send email (if implemented)
      try {
        await sendContactFormEmail(formData);
      } catch (emailErr) {
        console.error('Contact form email error:', emailErr.message);
        // Continue; do not fail the request if email fails
      }

      // Send auto-reply to customer (best-effort)
      try {
        if (email) {
          setImmediate(async () => {
            try {
              await sendContactAutoReplyEmail(formData);
            } catch (autoReplyErr) {
              console.warn('Contact auto-reply failed (continuing):', autoReplyErr?.message || autoReplyErr);
            }
          });
        }
      } catch (autoReplyWrapErr) {
        console.warn('Contact auto-reply scheduling failed (continuing):', autoReplyWrapErr?.message || autoReplyWrapErr);
      }

      const meta = getRequestMeta(req);
      const phoneDigits = phoneToDigitsOnly(formData.phone);

      const webhookData = {
        name,
        email,
        Phone_Number: phoneDigits,
        company: organization,
        city,
        Product: product,
        message,
        ...(formData.companySize != null && { companySize: formData.companySize }),
        ...(formData.inquiry != null && { inquiry: formData.inquiry }),
        ...meta,
      };

      sendToKissflowWebhook(WEBSITE_NAME, 'Contact form', webhookData);

      return status.responseStatus(res, 200, 'Contact form submitted successfully');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return status.responseStatus(res, 500, 'Failed to submit contact form', { error: error.message });
    }
  })();
}

// Contact form submission (public endpoint)
router.post('/submit', handleContactSubmit);

// Kissflow-style endpoint (same handler)
router.post('/', handleContactSubmit);

module.exports = router;

