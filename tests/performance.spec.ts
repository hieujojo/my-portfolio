import { expect, test, type Page } from '@playwright/test';

type FrameMetrics = {
  samples: number;
  averageFps: number;
  minFps: number;
  droppedFrames: number;
};

async function measureFrames(page: Page, duration = 3000): Promise<FrameMetrics> {
  return page.evaluate(async (sampleDuration) => {
    const deltas: number[] = [];
    let previous = 0;

    await new Promise<void>((resolve) => {
      const startedAt = performance.now();
      const tick = (timestamp: number) => {
        if (previous) deltas.push(timestamp - previous);
        previous = timestamp;
        if (timestamp - startedAt < sampleDuration) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });

    const fps = deltas.map((delta) => (delta > 0 ? 1000 / delta : 0));
    return {
      samples: deltas.length,
      averageFps: fps.length ? fps.reduce((sum, value) => sum + value, 0) / fps.length : 0,
      minFps: fps.length ? Math.min(...fps) : 0,
      droppedFrames: deltas.filter((delta) => delta > 16.7).length,
    };
  }, duration);
}

for (const section of ['home', 'skills']) {
  test(`measures ${section} runtime performance`, async ({ page }, testInfo) => {
    const modelRequests: { url: string; status: number; contentLength: string | undefined }[] = [];
    const errors: string[] = [];

    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', async (response) => {
      if (!response.url().match(/\.(glb|gltf|bin)(\?|$)/i)) return;
      modelRequests.push({
        url: response.url(),
        status: response.status(),
        contentLength: response.headers()['content-length'],
      });
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(4000);

    const canvasCount = await page.locator('canvas').count();
    if (section === 'skills') {
      await page.locator('#skills').scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
    } else {
      await page.locator('#home').scrollIntoViewIfNeeded();
    }

    const metrics = await measureFrames(page);
    console.log(JSON.stringify({ project: testInfo.project.name, section, canvasCount, modelRequests, metrics, errors }));

    expect(canvasCount).toBeGreaterThan(0);
    expect(errors).toEqual([]);
    expect(modelRequests.every((request) => request.status === 200)).toBeTruthy();
  });
}

test('scrolls through interactive sections without runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/', { waitUntil: 'domcontentloaded' });
  for (const section of ['about', 'education', 'experience', 'skills', 'projects', 'contact']) {
    await page.locator(`#${section}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
  }

  await expect(page.getByText('Send Transmission')).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1500);
  expect(errors).toEqual([]);
});
