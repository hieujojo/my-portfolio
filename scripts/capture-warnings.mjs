import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const warnings = [];
  const errors = [];

  page.on('console', (msg) => {
    const text = msg.text();
    if (msg.type() === 'warning') {
      warnings.push(text);
    } else if (msg.type() === 'error') {
      errors.push(text);
    }
  });

  page.on('pageerror', (err) => {
    errors.push(`[pageerror] ${err.message}`);
  });

  // Intercept and log React-related console messages
  await page.evaluate(() => {
    const originalWarn = console.warn;
    const originalError = console.error;
    console.warn = (...args) => {
      window.__capturedWarnings = window.__capturedWarnings || [];
      window.__capturedWarnings.push(args.join(' '));
      originalWarn.apply(console, args);
    };
    console.error = (...args) => {
      window.__capturedErrors = window.__capturedErrors || [];
      window.__capturedErrors.push(args.join(' '));
      originalError.apply(console, args);
    };
  });

  await page.goto('http://localhost:3194', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  const reactWarnings = await page.evaluate(() => window.__capturedWarnings || []);
  const reactErrors = await page.evaluate(() => window.__capturedErrors || []);

  console.log('=== Browser Console Warnings ===');
  warnings.forEach(w => console.log(w));
  
  console.log('\n=== React/JS Warnings ===');
  reactWarnings.forEach(w => console.log(w));
  
  console.log('\n=== Browser Console Errors ===');
  errors.forEach(e => console.log(e));
  
  console.log('\n=== React/JS Errors ===');
  reactErrors.forEach(e => console.log(e));

  if (warnings.length === 0 && reactWarnings.length === 0 && errors.length === 0 && reactErrors.length === 0) {
    console.log('\nNo warnings or errors captured.');
  }

  await browser.close();
})();
