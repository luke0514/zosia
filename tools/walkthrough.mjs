/**
 * End-to-end verification: drive a real browser through every chapter, submitting the
 * intended answer, and confirm each one unlocks the next.  Also unseals Chapter 10 and
 * checks that the closing text really is what it should be.
 *
 *   node tools/walkthrough.mjs [baseUrl]
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.argv[2] ?? 'http://127.0.0.1:8099';
const SHOTS = 'tools/shots';
mkdirSync(SHOTS, { recursive: true });

const ANSWERS = [
  ['the-beginning', 'LOOK AT THE MIRROR'],
  ['the-mirror', 'PRIMES HAVE TWO FACES'],
  ['the-broken-key', 'THE KEY WAS NEVER RANDOM'],
  ['the-zeroes', 'SEARCH BETWEEN DIMENSIONS'],
  ['the-curve', 'NOT EVERYTHING IS FLAT'],
  ['the-image', 'POLSKA MATEMATYKA ZMIENIŁA HISTORIĘ'],
  ['the-polish-connection', 'ENIGMA'],
  ['the-machine', 'YOU ARE CLOSER THAN YOU THINK'],
  ['the-library', 'THE FIRST LETTER OF EVERYTHING'],
];
const FINAL = 'LATMPHTFTKWNRSBDNEIFPMZHEYACTYTTFLOE';

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 } });
const page = await ctx.newPage();
const problems = [];
page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
page.on('console', (m) => {
  // Google Fonts is unreachable from some sandboxes; that path is meant to degrade.
  const text = m.text();
  const fontNoise = /ERR_TUNNEL_CONNECTION_FAILED|fonts\.(googleapis|gstatic)\.com/.test(text);
  if (m.type() === 'error' && !fontNoise) problems.push(`console: ${text}`);
});

const shot = (name) => page.screenshot({ path: `${SHOTS}/${name}.png`, fullPage: false });

console.log('— landing');
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(3200);
await shot('00-landing');
if (!(await page.getByText('CREATED FOR ONE.').isVisible())) problems.push('landing footer missing');

// A locked chapter must not render its content.
await page.goto(`${BASE}/puzzle/the-library/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
const lockedText = await page.textContent('body');
if (!lockedText.includes('not open yet')) problems.push('chapter 09 was not locked');
if (lockedText.includes('MS-A-01')) problems.push('LEAK: locked chapter rendered archive content');
await shot('01-locked');

for (const [slug, answer] of ANSWERS) {
  console.log('—', slug);
  await page.goto(`${BASE}/puzzle/${slug}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  const body = await page.textContent('body');
  if (body.includes('not open yet')) {
    problems.push(`${slug} did not unlock`);
    break;
  }
  await shot(`ch-${slug}`);

  // a wrong answer must be rejected
  const field = page.locator('input[id^="answer-"]');
  await field.fill('DEFINITELY NOT IT');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(900);
  if (!(await page.getByText('Not that.').isVisible())) problems.push(`${slug}: wrong answer accepted`);

  await field.fill(answer);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(1100);
  if (!(await page.getByText('Yes.').isVisible())) problems.push(`${slug}: correct answer rejected`);
}

console.log('— the question');
await page.goto(`${BASE}/puzzle/the-question/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await shot('ch-question-overture');
await page.waitForTimeout(15000); // let the overture play out
await shot('ch-question-asking');

const keyField = page.locator('#final-key');
await keyField.waitFor({ state: 'visible', timeout: 20000 });
await keyField.fill('WRONGKEYWRONGKEYWRONGKEYWRONGKEYWRON');
await page.getByRole('button', { name: 'Open' }).click();
await page.waitForTimeout(1200);
if (!(await page.getByText('Not that.').isVisible())) problems.push('final: wrong key accepted');

await keyField.fill(FINAL);
await page.getByRole('button', { name: 'Open' }).click();
await page.waitForTimeout(12000);
const revealed = await page.textContent('body');
for (const frag of ['rozwiązałaś', 'Gratulacje', 'Czy zostaniesz moją dziewczyną?']) {
  if (!revealed.includes(frag)) problems.push(`final: missing "${frag}"`);
}
await shot('ch-question-revealed');

// TAK / NIE
const nie = page.getByRole('button', { name: 'Nie' });
if (!(await nie.isVisible())) problems.push('NIE button missing');
await nie.hover();
await page.waitForTimeout(500);
await nie.hover();
await page.waitForTimeout(500);
await shot('ch-question-buttons');
await nie.click({ force: true });
await page.waitForTimeout(1200);
if (!(await page.getByText('worth keeping').isVisible())) problems.push('NIE gave no response');
await shot('ch-question-nie');

await page.getByRole('button', { name: 'change your answer' }).click();
await page.waitForTimeout(900);
await page.getByRole('button', { name: 'TAK' }).click();
await page.waitForTimeout(1200);
if (!(await page.getByText('correct answer all along').isVisible())) problems.push('TAK gave no response');
await shot('ch-question-tak');

// mobile pass
console.log('— mobile');
const m = await ctx.newPage();
await m.setViewportSize({ width: 390, height: 844 });
for (const slug of ['the-beginning', 'the-curve', 'the-machine', 'the-library']) {
  await m.goto(`${BASE}/puzzle/${slug}/`, { waitUntil: 'networkidle' });
  await m.waitForTimeout(900);
  const overflow = await m.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  if (overflow > 2) problems.push(`${slug}: horizontal overflow of ${overflow}px on mobile`);
  await m.screenshot({ path: `${SHOTS}/m-${slug}.png`, fullPage: false });
}

await browser.close();
console.log('\n' + (problems.length ? `PROBLEMS:\n - ${problems.join('\n - ')}` : 'ALL CHECKS PASSED'));
process.exit(problems.length ? 1 : 0);
