import { test } from '@playwright/test';
import { SelfHealingLocator } from '../../ai/selfHealingLocator';
import { BaselineManager } from '../../ai/baselineManager';
import { ElementSignature } from '../../types';

test('Baseline Capture: Save current element signatures as baseline', async ({ page }) => {
  await page.goto('https://app-stage.pluralsight.com/id');

  // Define selectors and fallback keys for baseline elements.
  const selectors = [
    { selector: '#Username', key: 'username' },
    { selector: '#Password', key: 'password' },
    { selector: '#login', key: 'loginbutton' }
  ];

  const currentSignatures: ElementSignature[] = [];
  const selfHealer = new SelfHealingLocator(page);

  for (const entry of selectors) {
    try {
      await page.waitForSelector(entry.selector, { timeout: 4000 });
      const handle = await page.$(entry.selector);
      const signature = await selfHealer.buildSignature(
        handle,
        { originalSelector: entry.key } as ElementSignature
      );
      if (signature) {
        currentSignatures.push(signature);
      }
    } catch (err) {
      console.error(`Error capturing signature for ${entry.selector}: ${err}`);
    }
  }

  const baselineManager = new BaselineManager();
  // Save the current signatures as the baseline.
  await baselineManager.saveBaseline(currentSignatures);
  console.log("Baseline has been updated with current element signatures.");
});
