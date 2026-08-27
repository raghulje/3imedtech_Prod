/**
 * Server-side spam / abuse protection for contact form submissions.
 * Silent-fail: callers should return a normal success response when blocked.
 */

const { phoneToDigitsOnly } = require('./requestMeta');

const DUPLICATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

/** In-memory recent submissions keyed by normalized email. */
const recentByEmail = new Map();

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamail.net',
  'sharklasers.com',
  'grr.la',
  'guerrillamailblock.com',
  'tempmail.com',
  'temp-mail.org',
  'temp-mail.io',
  '10minutemail.com',
  '10minutemail.net',
  'throwawaymail.com',
  'yopmail.com',
  'yopmail.fr',
  'trashmail.com',
  'trashmail.me',
  'getnada.com',
  'nada.email',
  'discard.email',
  'mailnesia.com',
  'maildrop.cc',
  'fakeinbox.com',
  'tempail.com',
  'moakt.com',
  'emailondeck.com',
  'mintemail.com',
  'mailcatch.com',
  'spamgourmet.com',
  'mailnull.com',
  'spambox.us',
  'tmpmail.org',
  'tmpmail.net',
  'dispostable.com',
  'mailinator.net',
  'mailinator.org',
]);

/** Exact probe / fake numbers (digits only, with and without 91). */
const KNOWN_PROBE_PHONES = new Set([
  '8234567890',
  '918234567890',
  '9876542123',
  '919876542123',
  '9876543210',
  '919876543210',
  '1234567890',
  '911234567890',
  '0000000000',
  '1111111111',
  '9999999999',
  '8888888888',
  '7777777777',
  '6666666666',
  '5555555555',
  '4444444444',
  '3333333333',
  '2222222222',
  '0123456789',
  '0987654321',
]);

const TEST_LOCAL_PART =
  /^(test|testing|tester|tests|fake|spam|asdf|qwerty|noreply|no-reply|admin|sample|demo|dummy|injection)([._+-]?\d*)?$/i;

/**
 * Detect HTML tags or common XSS vectors in a string.
 * @param {unknown} value
 * @returns {boolean}
 */
function containsHtmlOrXss(value) {
  if (value == null) return false;
  const s = String(value);
  if (!s) return false;
  if (/<\s*\/?\s*[a-zA-Z][^>]*>/i.test(s)) return true;
  if (/<\s*script\b/i.test(s)) return true;
  if (/javascript\s*:/i.test(s)) return true;
  if (/\bon[a-z]+\s*=/i.test(s)) return true;
  if (/data\s*:\s*text\/html/i.test(s)) return true;
  return false;
}

/**
 * Walk all string values in form data (shallow + one nesting level for arrays/objects).
 * @param {object} formData
 * @returns {string|null} field path that failed, or null
 */
function findHtmlOrXssField(formData) {
  if (!formData || typeof formData !== 'object') return null;
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string' && containsHtmlOrXss(value)) {
      return key;
    }
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] === 'string' && containsHtmlOrXss(value[i])) {
          return `${key}[${i}]`;
        }
      }
    }
  }
  return null;
}

/**
 * Normalize email for comparison.
 * @param {string} email
 * @returns {string}
 */
function normalizeEmail(email) {
  return String(email || '')
    .trim()
    .toLowerCase();
}

/**
 * Disposable / test / spam email detection.
 * Blocks test@..., TestingInjection@..., known temp-mail domains, etc.
 * Avoids blocking legitimate addresses that merely contain "test" mid-local-part
 * (e.g. contest@company.com) unless other strong signals apply.
 * @param {string} email
 * @returns {{ blocked: boolean, reason?: string }}
 */
function checkDisposableOrTestEmail(email) {
  const normalized = normalizeEmail(email);
  if (!normalized || !normalized.includes('@')) {
    return { blocked: false };
  }

  const [localRaw, domainRaw] = normalized.split('@');
  const local = (localRaw || '').replace(/\+.*$/, ''); // strip plus-tagging
  const domain = domainRaw || '';

  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return { blocked: true, reason: 'disposable email domain' };
  }

  // Common temp-mail / throwaway domain patterns
  if (
    /(^|\.)(temp|tmp|trash|throwaway|fake|spam|mailinator|guerrilla|yopmail|disposable|10minute)/i.test(
      domain
    )
  ) {
    return { blocked: true, reason: 'disposable email domain pattern' };
  }

  if (TEST_LOCAL_PART.test(local)) {
    return { blocked: true, reason: 'test/spam email local-part' };
  }

  // Explicit abuse tokens in local part (e.g. TestingInjection@gmail.com)
  if (/injection|xss|sqlinject|spamtest|faketest/i.test(local)) {
    return { blocked: true, reason: 'abuse token in email' };
  }

  // test@gmail.com, test.user@..., test123@...
  if (/^test([._+-]|$)/i.test(local)) {
    return { blocked: true, reason: 'test email address' };
  }

  return { blocked: false };
}

/**
 * Strip leading India country code for pattern checks when present.
 * @param {string} digits
 * @returns {string}
 */
function nationalPhoneDigits(digits) {
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

/**
 * Long ascending/descending digit run (length >= minLen).
 * @param {string} digits
 * @param {number} minLen
 * @returns {boolean}
 */
function hasLongSequentialRun(digits, minLen = 8) {
  if (!digits || digits.length < minLen) return false;
  let asc = 1;
  let desc = 1;
  for (let i = 1; i < digits.length; i++) {
    const a = digits.charCodeAt(i - 1) - 48;
    const b = digits.charCodeAt(i) - 48;
    asc = b === (a + 1) % 10 ? asc + 1 : 1;
    desc = b === (a + 9) % 10 ? desc + 1 : 1;
    if (asc >= minLen || desc >= minLen) return true;
  }
  return false;
}

/**
 * Suspicious / probe phone numbers.
 * @param {string|number} phone
 * @returns {{ blocked: boolean, reason?: string }}
 */
function checkSuspiciousPhone(phone) {
  const digits = phoneToDigitsOnly(phone);
  if (!digits) {
    return { blocked: false };
  }

  if (KNOWN_PROBE_PHONES.has(digits)) {
    return { blocked: true, reason: 'known probe/fake phone' };
  }

  const national = nationalPhoneDigits(digits);
  if (KNOWN_PROBE_PHONES.has(national)) {
    return { blocked: true, reason: 'known probe/fake phone' };
  }

  // All identical digits
  if (/^(\d)\1+$/.test(digits) || /^(\d)\1+$/.test(national)) {
    return { blocked: true, reason: 'repeated-digit phone' };
  }

  // Very few unique digits in a 10-digit national number
  if (national.length >= 10) {
    const unique = new Set(national.split('')).size;
    if (unique <= 2) {
      return { blocked: true, reason: 'low-entropy phone' };
    }
  }

  if (hasLongSequentialRun(digits, 8) || hasLongSequentialRun(national, 8)) {
    return { blocked: true, reason: 'sequential test phone' };
  }

  // Near-sequential probe like 9876542123 (long descending prefix)
  if (national.length === 10 && hasLongSequentialRun(national.slice(0, 6), 6)) {
    const rest = national.slice(6);
    // Trailing filler that is itself low-entropy or tiny sequence
    if (new Set(rest.split('')).size <= 3 || hasLongSequentialRun(rest, 3)) {
      return { blocked: true, reason: 'suspicious sequential phone pattern' };
    }
  }

  return { blocked: false };
}

/**
 * Duplicate submission within the rate-limit window (same email).
 * @param {string} email
 * @returns {{ blocked: boolean, reason?: string }}
 */
function checkDuplicateSubmission(email) {
  const key = normalizeEmail(email);
  if (!key) return { blocked: false };

  const now = Date.now();
  // Opportunistic cleanup
  for (const [k, ts] of recentByEmail.entries()) {
    if (now - ts > DUPLICATE_WINDOW_MS) recentByEmail.delete(k);
  }

  const prev = recentByEmail.get(key);
  if (prev != null && now - prev < DUPLICATE_WINDOW_MS) {
    return { blocked: true, reason: 'duplicate within 10 minutes' };
  }
  return { blocked: false };
}

/**
 * Record a successful (accepted) submission for rate limiting.
 * Call only after spam checks pass and you intend to process the lead.
 * @param {string} email
 */
function recordAcceptedSubmission(email) {
  const key = normalizeEmail(email);
  if (!key) return;
  recentByEmail.set(key, Date.now());
}

/**
 * Evaluate contact form payload for spam / abuse.
 * Does not log PII — only reason codes suitable for server logs.
 *
 * @param {object} formData - Raw request body
 * @param {{ email?: string, phone?: string, skipDuplicateRecord?: boolean }} [opts]
 * @returns {{ blocked: boolean, reason: string|null }}
 */
function evaluateContactSpam(formData, opts = {}) {
  const data = formData && typeof formData === 'object' ? formData : {};
  const email = opts.email != null ? opts.email : data.email || '';
  const phone =
    opts.phone != null
      ? opts.phone
      : data.phone || data.Phone_Number || data.phoneNumber || '';

  const xssField = findHtmlOrXssField(data);
  if (xssField) {
    return { blocked: true, reason: `XSS/HTML payload in field:${xssField}` };
  }

  const emailCheck = checkDisposableOrTestEmail(email);
  if (emailCheck.blocked) {
    return { blocked: true, reason: emailCheck.reason };
  }

  const phoneCheck = checkSuspiciousPhone(phone);
  if (phoneCheck.blocked) {
    return { blocked: true, reason: phoneCheck.reason };
  }

  const dupCheck = checkDuplicateSubmission(email);
  if (dupCheck.blocked) {
    return { blocked: true, reason: dupCheck.reason };
  }

  return { blocked: false, reason: null };
}

/**
 * Log a blocked submission without sensitive customer data.
 * @param {string} reason
 * @param {{ path?: string }} [meta]
 */
function logIgnoredSpam(reason, meta = {}) {
  const pathPart = meta.path ? ` path=${meta.path}` : '';
  console.log(`[SpamProtection] Ignored spam submission. reason=${reason}${pathPart}`);
}

/**
 * Test helper: clear rate-limit state.
 */
function _resetDuplicateStoreForTests() {
  recentByEmail.clear();
}

module.exports = {
  evaluateContactSpam,
  recordAcceptedSubmission,
  logIgnoredSpam,
  containsHtmlOrXss,
  checkDisposableOrTestEmail,
  checkSuspiciousPhone,
  checkDuplicateSubmission,
  DUPLICATE_WINDOW_MS,
  _resetDuplicateStoreForTests,
};
