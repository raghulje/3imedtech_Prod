const express = require('express');
const router = express.Router();
const { sendContactFormEmail, sendContactAutoReplyEmail } = require('../utils/emailService');
const status = require('../helpers/response');
const { getRequestMeta, phoneToDigitsOnly } = require('../helpers/requestMeta');
const { sendToKissflowWebhook } = require('../helpers/kissflowWebhook');
const {
  evaluateContactSpam,
  recordAcceptedSubmission,
  logIgnoredSpam,
} = require('../helpers/spamProtection');

const WEBSITE_NAME = '3iMedtech';
const AGENT_ID = '6a048520285bce8bb13c28cc';
const SUCCESS_MESSAGE = 'Contact form submitted successfully';

function splitCityAndState(value) {
  const raw = String(value || '').trim();
  if (!raw) {
    return { cityname: '', statename: '' };
  }

  const [cityname = '', ...rest] = raw.split(',');
  return {
    cityname: cityname.trim(),
    statename: rest.join(',').trim(),
  };
}

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

      // Server-side spam / abuse checks (silent success when blocked)
      const spam = evaluateContactSpam(formData, {
        email,
        phone: formData.phone,
      });
      if (spam.blocked) {
        logIgnoredSpam(spam.reason, { path: req.originalUrl || req.path });
        return status.responseStatus(res, 200, SUCCESS_MESSAGE);
      }

      // Valid submission only: email + Kissflow
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
      const { cityname, statename } = splitCityAndState(city);

      const webhookData = {
        name,
        email,
        Phone_Number: phoneDigits,
        agentid: AGENT_ID,
        company: organization,
        city,
        ...(cityname && { cityname }),
        ...(statename && { statename }),
        Product: product,
        message,
        ...(formData.companySize != null && { companySize: formData.companySize }),
        ...(formData.inquiry != null && { inquiry: formData.inquiry }),
        ...meta,
      };

      sendToKissflowWebhook(WEBSITE_NAME, 'Contact form', webhookData);
      recordAcceptedSubmission(email);

      return status.responseStatus(res, 200, SUCCESS_MESSAGE);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return status.responseStatus(res, 500, 'Failed to submit contact form', { error: error.message });
    }
  })();
}

// Contact form submission (public endpoint)
// Mounted at both /api/contact and /api/contact-form
router.post('/submit', handleContactSubmit);

// Kissflow-style endpoint (same handler)
router.post('/', handleContactSubmit);

module.exports = router;
