import { test, expect } from '@playwright/test';
import { SelfHealingLocator } from '../../ai/selfHealingLocator';
import { BaselineManager } from '../../ai/baselineManager';
import { ElementSignature } from '../../types';

test('Baseline Comparison: Compare current element signatures with baseline', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Define selectors and fallback keys for baseline elements.
  const selectors = [
    { selector: '#user-name', key: 'username' },
    { selector: '#password', key: 'password' },
    { selector: '#login-button', key: 'loginbutton' }
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
  const differences = await baselineManager.compareWithBaseline(currentSignatures);
  console.log("Baseline differences:", differences);

  // Optionally assert that differences are within acceptable limits.
  // For example:
  // expect(differences.length).toBe(0);
});
