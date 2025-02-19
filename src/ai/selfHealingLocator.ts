// src/ai/selfHealingLocator.ts

import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';
import { waitForCondition } from '../utils/waitForCondition';
import { getStoredSignature } from '../locators/signatureStore';
import { compareSignatures } from '../utils/mathUtils';
import { ElementSignature } from '../types';
const ENABLE_SELF_HEALING_FALLBACK = true;

export class SelfHealingLocator {
  constructor(private page: Page) {}
  
  /**
   * Attempts to find an element using the primary selector.
   * If not found, uses ML fallback logic with the provided fallback signature key.
   */
  public async find(primarySelector: string, fallbackSignatureKey?: string): Promise<Locator> {
    
    try {
      await waitForCondition(async () => {
        // Try to find the element; return true if found.
        return !!(await this.page.$(primarySelector));
      }, 4000, 500);

      //await this.page.waitForSelector(primarySelector, { timeout: 4000 });
      Logger.info(`Found element using primary selector "${primarySelector}"`);
      return this.page.locator(primarySelector);
    } catch (err) {
      Logger.warn(`Primary selector "${primarySelector}" failed. Error: ${err}`);
    }

     // Check if fallback is globally disabled
     if (!ENABLE_SELF_HEALING_FALLBACK) {
      throw new Error(
        `Primary selector "${primarySelector}" not found and fallback is disabled.`
      );
    }

    if (fallbackSignatureKey) {
      Logger.info(`Attempting ML fallback with signature key "${fallbackSignatureKey}"...`);
      return this.mlFallback(fallbackSignatureKey);
    }

    Logger.info(`No fallback provided. Attempting ML fallback with primary selector as key...`);
    return this.mlFallback(primarySelector);
  }

  private async mlFallback(signatureKey: string): Promise<Locator> {
    const knownSignature = getStoredSignature(signatureKey);
    if (!knownSignature) {
      throw new Error(`No stored signature for key '${signatureKey}'. Cannot self-heal.`);
    }

    const candidates = await this.page.$$(knownSignature.tagName);
    if (!candidates.length) {
      throw new Error(`No DOM candidates found for self-healing with tag: ${knownSignature.tagName}`);
    }

    let bestCandidateHandle: any = null;
    let bestSimilarity = 0;
    for (const handle of candidates) {
      const candidateSignature = await this.buildSignature(handle, knownSignature);
      if (!candidateSignature) continue;
      const similarity = compareSignatures(knownSignature, candidateSignature);
      if (similarity > bestSimilarity) {
        bestSimilarity = similarity;
        bestCandidateHandle = handle;
      }
    }

    if (!bestCandidateHandle || bestSimilarity < 0.7) {
      throw new Error(`No sufficiently similar element found to self-heal '${signatureKey}'.`);
    }
    Logger.info(`Self-healing success for key '${signatureKey}': similarity = ${bestSimilarity.toFixed(2)}`);

    const bestSig = await this.buildSignature(bestCandidateHandle, knownSignature);
    if (!bestSig) {
      throw new Error(`Unable to build a signature from best candidate handle for '${signatureKey}'.`);
    }

    const recommendedLocator = await this.buildRecommendedLocator(bestSig);
    if (recommendedLocator) return recommendedLocator;

    return this.buildFallbackLocator(bestCandidateHandle, bestSig);
  }

  public async buildSignature(elementHandle: any, knownSignature: ElementSignature): Promise<ElementSignature | null> {
    try {
      const tagName = await elementHandle.evaluate((e: HTMLElement) => e.tagName.toLowerCase());
      const id = await elementHandle.getAttribute('id');
      const className = await elementHandle.getAttribute('class');
      const classList = className ? className.split(/\s+/).filter(Boolean) : [];
      const textContent = await elementHandle.textContent();
      const textTokens = textContent ? textContent.trim().split(/\s+/) : [];
      const type = await elementHandle.getAttribute('type');
      const placeholder = await elementHandle.getAttribute('placeholder');
      const alt = await elementHandle.getAttribute('alt');
      const title = await elementHandle.getAttribute('title');
      const dataTestId = await elementHandle.getAttribute('data-testid');
      const ariaLabel = await elementHandle.getAttribute('aria-label');
      const role = await elementHandle.getAttribute('role');
      const value = await elementHandle.getAttribute('value');
      return {
        originalSelector: knownSignature.originalSelector,
        tagName,
        id,
        classList,
        textTokens,
        type,
        placeholder,
        alt,
        title,
        dataTestId,
        ariaLabel,
        role,
        value
      };
    } catch (err) {
      Logger.error(`Error building candidate signature: ${err}`);
      return null;
    }
  }

  private async buildRecommendedLocator(signature: ElementSignature): Promise<Locator | null> {
    const { role, ariaLabel, placeholder, alt, title, dataTestId, textTokens, tagName, type, value } = signature;
    if (role) {
      const possibleName = textTokens && textTokens.length ? textTokens.join(' ') : undefined;
      if (possibleName) {
        Logger.info(`Trying getByRole('${role}', { name: "${possibleName}" })`);
        return this.page.getByRole(role as any, { name: possibleName });
      }
      Logger.info(`Trying getByRole('${role}') without name`);
      return this.page.getByRole(role as any);
    }
    if (tagName === 'input' && type && type.toLowerCase() === 'submit') {
      if (value) {
        Logger.info(`Heuristic: input[type=submit] with value "${value}" => getByRole('button', { name: "${value}" })`);
        return this.page.getByRole('button', { name: value });
      }
      Logger.info(`Heuristic: input[type=submit] => getByRole('button')`);
      return this.page.getByRole('button');
    }
    if (ariaLabel) {
      Logger.info(`Trying getByLabel('${ariaLabel}')`);
      return this.page.getByLabel(ariaLabel);
    }
    if (placeholder) {
      Logger.info(`Trying getByPlaceholder('${placeholder}')`);
      return this.page.getByPlaceholder(placeholder);
    }
    if (alt) {
      Logger.info(`Trying getByAltText('${alt}')`);
      return this.page.getByAltText(alt);
    }
    if (title) {
      Logger.info(`Trying getByTitle('${title}')`);
      return this.page.getByTitle(title);
    }
    if (dataTestId) {
      Logger.info(`Trying getByTestId('${dataTestId}')`);
      return this.page.getByTestId(dataTestId);
    }
    if (textTokens && textTokens.length > 0) {
      const partialText = textTokens.slice(0, 4).join(' ');
      Logger.info(`Trying getByText('${partialText}')`);
      return this.page.getByText(partialText);
    }
    return null;
  }

  private async buildFallbackLocator(elementHandle: any, signature: ElementSignature): Promise<Locator> {
    const candidateId = await elementHandle.getAttribute('id');
    if (candidateId) {
      Logger.info(`Using fallback ID: #${candidateId}`);
      return this.page.locator(`#${candidateId}`);
    }
    const candidateDataTest = await elementHandle.getAttribute('data-test');
    if (candidateDataTest) {
      Logger.info(`Using fallback data-test: [data-test="${candidateDataTest}"]`);
      return this.page.locator(`[data-test="${candidateDataTest}"]`);
    }
    const text = signature.textTokens ? signature.textTokens.join(' ') : '';
    if (text) {
      const snippet = text.slice(0, 10);
      Logger.info(`Using partial text fallback with snippet "${snippet}"`);
      return this.page.locator(`xpath=//${signature.tagName}[contains(., "${snippet}")]`);
    }
    throw new Error(`No suitable fallback for self-healing key '${signature.originalSelector}'.`);
  }
}
