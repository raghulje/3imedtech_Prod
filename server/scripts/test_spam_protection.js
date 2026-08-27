/**
 * Unit tests for contact-form spam protection.
 * Run: node scripts/test_spam_protection.js
 */

const assert = require('assert');
const path = require('path');

const spam = require(path.join(__dirname, '../helpers/spamProtection'));

function baseValidForm(overrides = {}) {
  return {
    fname: 'Priya Sharma',
    email: 'priya.sharma@apollohospitals.com',
    organization: 'Apollo Hospitals',
    city: 'Chennai, Tamil Nadu',
    product: 'FPD C-ARM',
    message: 'Looking for pricing and demo availability next month.',
    phone: '9840098123',
    ...overrides,
  };
}

function expectBlocked(form, reasonIncludes, label) {
  spam._resetDuplicateStoreForTests();
  const result = spam.evaluateContactSpam(form, {
    email: form.email,
    phone: form.phone,
  });
  assert.strictEqual(result.blocked, true, `${label}: expected blocked`);
  if (reasonIncludes) {
    assert.ok(
      String(result.reason).toLowerCase().includes(String(reasonIncludes).toLowerCase()),
      `${label}: expected reason to include "${reasonIncludes}", got "${result.reason}"`
    );
  }
  console.log(`  PASS blocked: ${label} -> ${result.reason}`);
}

function expectAllowed(form, label) {
  spam._resetDuplicateStoreForTests();
  const result = spam.evaluateContactSpam(form, {
    email: form.email,
    phone: form.phone,
  });
  assert.strictEqual(result.blocked, false, `${label}: expected allowed, got ${result.reason}`);
  console.log(`  PASS allowed: ${label}`);
}

function main() {
  console.log('=== Spam protection unit tests ===\n');
  let failed = 0;

  function safe(fn) {
    try {
      fn();
    } catch (err) {
      failed += 1;
      console.error(`  FAIL: ${err.message}`);
    }
  }

  console.log('Valid / legitimate');
  safe(() => expectAllowed(baseValidForm(), 'legitimate hospital lead'));
  safe(() =>
    expectAllowed(
      baseValidForm({ email: 'contest@acmehealth.org', phone: '9810098100' }),
      'email containing "test" mid-word (contest@)'
    )
  );
  safe(() =>
    expectAllowed(
      baseValidForm({
        email: 'ravi.kumar@fortis.in',
        phone: '9003124567',
        message: 'Need quote for mammography system',
      }),
      'another legitimate lead'
    )
  );

  console.log('\nXSS / HTML');
  safe(() =>
    expectBlocked(
      baseValidForm({ message: "<script>alert('1')</script>" }),
      'xss/html',
      'script tag in message'
    )
  );
  safe(() =>
    expectBlocked(
      baseValidForm({ fname: '<h1>Testing Injection</h1>' }),
      'xss/html',
      'h1 injection in name'
    )
  );
  safe(() =>
    expectBlocked(
      baseValidForm({ organization: '<img src=x onerror=alert(1)>' }),
      'xss/html',
      'img onerror in organization'
    )
  );

  console.log('\nDisposable / test emails');
  safe(() =>
    expectBlocked(baseValidForm({ email: 'test@gmail.com' }), 'test/spam', 'test@gmail.com')
  );
  safe(() =>
    expectBlocked(baseValidForm({ email: 'test@example.com' }), 'test', 'test@example.com')
  );
  safe(() =>
    expectBlocked(
      baseValidForm({ email: 'TestingInjection@gmail.com' }),
      'abuse',
      'TestingInjection@gmail.com'
    )
  );
  safe(() =>
    expectBlocked(
      baseValidForm({ email: 'user@mailinator.com' }),
      'disposable',
      'mailinator disposable domain'
    )
  );
  safe(() =>
    expectBlocked(
      baseValidForm({ email: 'abc@tempmail.com' }),
      'disposable',
      'tempmail.com'
    )
  );

  console.log('\nSuspicious phones');
  safe(() =>
    expectBlocked(
      baseValidForm({ phone: '918234567890' }),
      'probe',
      '918234567890'
    )
  );
  safe(() =>
    expectBlocked(baseValidForm({ phone: '8234567890' }), 'probe', '8234567890')
  );
  safe(() =>
    expectBlocked(
      baseValidForm({ phone: '919876542123' }),
      'probe',
      '919876542123'
    )
  );
  safe(() =>
    expectBlocked(baseValidForm({ phone: '1111111111' }), 'phone', '1111111111')
  );

  console.log('\nDuplicate within 10 minutes');
  safe(() => {
    spam._resetDuplicateStoreForTests();
    const form = baseValidForm({ email: 'dup.check@hospital.org' });
    const first = spam.evaluateContactSpam(form, { email: form.email, phone: form.phone });
    assert.strictEqual(first.blocked, false, 'first submit should pass');
    spam.recordAcceptedSubmission(form.email);
    const second = spam.evaluateContactSpam(form, { email: form.email, phone: form.phone });
    assert.strictEqual(second.blocked, true, 'second submit should be blocked');
    assert.ok(
      /duplicate/i.test(second.reason),
      `expected duplicate reason, got ${second.reason}`
    );
    console.log(`  PASS blocked: duplicate within 10 minutes -> ${second.reason}`);
  });

  console.log('\nFour endpoint paths share the same helper (sanity)');
  const paths = [
    '/api/contact/submit',
    '/api/contact/',
    '/api/contact-form/submit',
    '/api/contact-form/',
  ];
  safe(() => {
    for (const p of paths) {
      spam._resetDuplicateStoreForTests();
      const form = baseValidForm({ message: '<h1>Testing Injection</h1>' });
      const result = spam.evaluateContactSpam(form, { email: form.email, phone: form.phone });
      assert.strictEqual(result.blocked, true, `${p} should block XSS`);
      spam.logIgnoredSpam(result.reason, { path: p });
    }
    console.log(`  PASS: same rules apply to ${paths.length} contact-form paths`);
  });

  console.log('\n=== Done ===');
  if (failed > 0) {
    console.error(`\n${failed} test group(s) failed`);
    process.exit(1);
  }
  console.log('All spam protection checks passed.');
}

main();
