/**
 * Request metadata helpers for contact form and Kissflow webhook.
 */

/**
 * Normalize phone to digits only.
 * @param {string|number} phone - Raw phone value
 * @returns {string} Digits-only string
 */
function phoneToDigitsOnly(phone) {
  if (phone == null) return '';
  return String(phone).replace(/\D/g, '');
}

/**
 * Parse User-Agent string into device type and browser.
 * @param {string} ua - User-Agent header
 * @returns {{ deviceType: string, browser: string }}
 */
function parseUserAgent(ua) {
  if (!ua || typeof ua !== 'string') {
    return { deviceType: 'unknown', browser: 'unknown' };
  }
  const s = ua.toLowerCase();
  let deviceType = 'desktop';
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(s)) {
    deviceType = 'mobile';
  } else if (/tablet|ipad|playbook|silk/i.test(s)) {
    deviceType = 'tablet';
  }
  let browser = 'unknown';
  if (s.includes('edg/')) browser = 'Edge';
  else if (s.includes('opr/') || s.includes('opera')) browser = 'Opera';
  else if (s.includes('chrome')) browser = 'Chrome';
  else if (s.includes('safari') && !s.includes('chrome')) browser = 'Safari';
  else if (s.includes('firefox')) browser = 'Firefox';
  else if (s.includes('msie') || s.includes('trident')) browser = 'IE';
  return { deviceType, browser };
}

/**
 * Get request metadata for logging and webhook payloads.
 * @param {import('express').Request} req - Express request
 * @returns {{
 *   timestamp: number,
 *   dateTime: string,
 *   date: string,
 *   time: string,
 *   ipAddress: string,
 *   userAgent: string,
 *   deviceType: string,
 *   browser: string,
 *   countryCode: string,
 *   referer: string,
 *   source: string
 * }}
 */
function getRequestMeta(req) {
  const now = new Date();
  const ua = req.get('user-agent') || '';
  const { deviceType, browser } = parseUserAgent(ua);
  const forwarded = req.get('x-forwarded-for');
  const ipAddress = forwarded ? forwarded.split(',')[0].trim() : (req.ip || req.connection?.remoteAddress || '');
  const referer = req.get('referer') || req.get('referrer') || '';
  const source = referer || 'direct';

  return {
    timestamp: now.getTime(),
    dateTime: now.toISOString(),
    date: now.toISOString().slice(0, 10),
    time: now.toTimeString().slice(0, 8),
    ipAddress,
    userAgent: ua,
    deviceType,
    browser,
    countryCode: req.get('cf-ipcountry') || req.get('x-vercel-ip-country') || '',
    referer,
    source,
  };
}

module.exports = {
  getRequestMeta,
  phoneToDigitsOnly,
  parseUserAgent,
};
