/**
 * HTTP integration tests for contact-form spam protection across all 4 mounts.
 * Stubs email + Kissflow so nothing is sent externally.
 *
 * Run: node scripts/test_contact_form_http.js
 */

const http = require('http');
const express = require('express');

const spam = require('../helpers/spamProtection');

const calls = { email: 0, autoReply: 0, kissflow: 0 };

// contact_form destructures email/kissflow at load time — stub first, then require route.
delete require.cache[require.resolve('../routes/contact_form')];
delete require.cache[require.resolve('../utils/emailService')];
delete require.cache[require.resolve('../helpers/kissflowWebhook')];

const emailService = require('../utils/emailService');
const kissflow = require('../helpers/kissflowWebhook');
emailService.sendContactFormEmail = async () => {
  calls.email += 1;
};
emailService.sendContactAutoReplyEmail = async () => {
  calls.autoReply += 1;
};
kissflow.sendToKissflowWebhook = () => {
  calls.kissflow += 1;
};

const contactRouter = require('../routes/contact_form');

function resetCalls() {
  calls.email = 0;
  calls.autoReply = 0;
  calls.kissflow = 0;
  spam._resetDuplicateStoreForTests();
}

function validBody(overrides = {}) {
  return {
    fname: 'Priya Sharma',
    email: `priya.${Date.now()}@apollohospitals.com`,
    organization: 'Apollo Hospitals',
    city: 'Chennai, Tamil Nadu',
    product: 'FPD C-ARM',
    message: 'Looking for pricing and demo availability next month.',
    phone: '9840098123',
    ...overrides,
  };
}

function postJson(port, urlPath, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        path: urlPath,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      },
      (res) => {
        let raw = '';
        res.on('data', (c) => (raw += c));
        res.on('end', () => {
          let json = null;
          try {
            json = JSON.parse(raw);
          } catch (_) {
            json = { raw };
          }
          resolve({ status: res.statusCode, body: json });
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function assertCase(label, fn) {
  try {
    await fn();
    console.log(`  PASS: ${label}`);
  } catch (err) {
    console.error(`  FAIL: ${label} -> ${err.message}`);
    throw err;
  }
}

async function main() {
  const app = express();
  app.use(express.json());
  app.use('/api/contact', contactRouter);
  app.use('/api/contact-form', contactRouter);

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();

  const paths = [
    '/api/contact/submit',
    '/api/contact/',
    '/api/contact-form/submit',
    '/api/contact-form/',
  ];

  let failures = 0;

  console.log(`=== Contact form HTTP tests (port ${port}) ===\n`);

  try {
    console.log('Valid submissions on all 4 paths');
    for (const p of paths) {
      await assertCase(`valid -> ${p}`, async () => {
        resetCalls();
        const res = await postJson(port, p, validBody());
        if (res.status !== 200) throw new Error(`status ${res.status}`);
        if (!res.body.success) throw new Error('success=false');
        if (calls.email !== 1) throw new Error(`email calls=${calls.email}`);
        if (calls.kissflow !== 1) throw new Error(`kissflow calls=${calls.kissflow}`);
      }).catch(() => {
        failures += 1;
      });
    }

    console.log('\nSpam cases return success but skip email/Kissflow');
    const spamCases = [
      {
        label: 'XSS script',
        body: validBody({ message: "<script>alert('1')</script>" }),
      },
      {
        label: 'HTML h1 injection',
        body: validBody({ fname: '<h1>Testing Injection</h1>' }),
      },
      {
        label: 'test@gmail.com',
        body: validBody({ email: 'test@gmail.com' }),
      },
      {
        label: 'TestingInjection@gmail.com',
        body: validBody({ email: 'TestingInjection@gmail.com' }),
      },
      {
        label: 'phone 918234567890',
        body: validBody({ phone: '918234567890' }),
      },
      {
        label: 'phone 8234567890',
        body: validBody({ phone: '8234567890' }),
      },
      {
        label: 'phone 919876542123',
        body: validBody({ phone: '919876542123' }),
      },
    ];

    for (const p of paths) {
      for (const sc of spamCases) {
        await assertCase(`${sc.label} on ${p}`, async () => {
          resetCalls();
          const res = await postJson(port, p, sc.body);
          if (res.status !== 200) throw new Error(`status ${res.status}`);
          if (!res.body.success) throw new Error('expected silent success');
          if (calls.email !== 0) throw new Error(`email should be 0, got ${calls.email}`);
          if (calls.kissflow !== 0) throw new Error(`kissflow should be 0, got ${calls.kissflow}`);
        }).catch(() => {
          failures += 1;
        });
      }
    }

    console.log('\nDuplicate within 10 minutes');
    await assertCase('duplicate ignored on /api/contact-form/submit', async () => {
      resetCalls();
      const email = `dup.${Date.now()}@hospital.org`;
      const body = validBody({ email });
      const first = await postJson(port, '/api/contact-form/submit', body);
      if (first.status !== 200 || calls.email !== 1 || calls.kissflow !== 1) {
        throw new Error('first submit should send email+kissflow');
      }
      const beforeEmail = calls.email;
      const beforeKiss = calls.kissflow;
      const second = await postJson(port, '/api/contact-form/submit', body);
      if (second.status !== 200 || !second.body.success) {
        throw new Error('second should silent-success');
      }
      if (calls.email !== beforeEmail || calls.kissflow !== beforeKiss) {
        throw new Error('duplicate must not send email/kissflow again');
      }
    }).catch(() => {
      failures += 1;
    });
  } finally {
    server.close();
  }

  console.log('\n=== Done ===');
  if (failures > 0) {
    console.error(`${failures} failure(s)`);
    process.exit(1);
  }
  console.log('All HTTP contact-form spam tests passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
