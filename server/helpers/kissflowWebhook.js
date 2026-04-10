/**
 * Kissflow webhook integration: queue submissions and send to webhook asynchronously.
 * Worker processes one item at a time with a delay between requests.
 */

const https = require('https');
const http = require('http');

const KISSFLOW_WEBHOOK_URL =
  'https://development-refexgroup.kissflow.com/integration/2/AcCMptp3yqcn/webhook/4e9yNyjAD6uxENJXAhNbtXzEGuOVQbDukBaeyWoG0kkqoeCkhIaxbK8FF4sWPWtcuQema2TcT-gLfVu3ot6g';

const QUEUE_DELAY_MS_MIN = 3000;
const QUEUE_DELAY_MS_MAX = 4000;

const queue = [];
let isProcessing = false;

function randomString(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getWebsiteSlug(websiteName) {
  if (!websiteName || typeof websiteName !== 'string') return 'website';
  return websiteName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function generateSubmissionId(websiteName) {
  const slug = getWebsiteSlug(websiteName);
  return `${slug}-${Date.now()}-${randomString(8)}`;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function postJson(url, body) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const isHttps = parsed.protocol === 'https:';
    const lib = isHttps ? https : http;
    const data = JSON.stringify(body);
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || (isHttps ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(data, 'utf8'),
      },
    };
    const req = lib.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => resolve({ statusCode: res.statusCode, body }));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.write(data);
    req.end();
  });
}

async function processNext() {
  if (queue.length === 0) {
    isProcessing = false;
    return;
  }
  const item = queue.shift();
  const { websiteName, formName, formData } = item;
  const submissionId = generateSubmissionId(websiteName);
  const websiteAndForm = `${websiteName} - ${formName}`;
  const payload = {
    ...formData,
    submissionId,
    websiteName,
    formName,
    'Website and form': websiteAndForm,
    Website_and_form: websiteAndForm,
  };
  try {
    await delay(QUEUE_DELAY_MS_MIN + Math.random() * (QUEUE_DELAY_MS_MAX - QUEUE_DELAY_MS_MIN));
    const result = await postJson(KISSFLOW_WEBHOOK_URL, payload);
    if (result.statusCode >= 200 && result.statusCode < 300) {
      console.log('[Kissflow] Webhook sent:', submissionId);
    } else {
      console.warn('[Kissflow] Webhook non-2xx:', result.statusCode, result.body);
    }
  } catch (err) {
    console.warn('[Kissflow] Webhook error (non-blocking):', err.message);
  }
  setImmediate(processNext);
}

/**
 * Queue a submission for the Kissflow webhook. Does not block.
 * @param {string} websiteName - e.g. "3imedtech"
 * @param {string} formName - e.g. "Contact form"
 * @param {object} formData - Form fields + metadata to send
 */
function sendToKissflowWebhook(websiteName, formName, formData) {
  if (!formData || typeof formData !== 'object') return;
  queue.push({ websiteName: websiteName || '3imedtech', formName: formName || 'Contact form', formData: { ...formData } });
  if (!isProcessing) {
    isProcessing = true;
    setImmediate(processNext);
  }
}

module.exports = {
  sendToKissflowWebhook,
};
