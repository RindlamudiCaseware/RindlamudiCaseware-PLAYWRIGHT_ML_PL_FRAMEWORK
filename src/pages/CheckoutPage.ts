import { BasePage } from './BasePage';
import { Page } from '@playwright/test';
import { SelfHealingLocator } from '../ai/selfHealingLocator';

export class CheckoutPage extends BasePage {
  private selfHealer: SelfHealingLocator;

  constructor(page: Page) {
    super(page);
    this.selfHealer = new SelfHealingLocator(page);
  }

  async fillDetails(firstName: string, lastName: string, postalCode: string) {
    const fnInput = await this.selfHealer.find('#first-name','firstname');
    await fnInput.fill(firstName);

    const lnInput = await this.selfHealer.find('#last-name','lastname');
    await lnInput.fill(lastName);

    const zipInput = await this.selfHealer.find('#postal-code','postalCode');
    await zipInput.fill(postalCode);

    const continueBtn = await this.selfHealer.find('#continue','continue');
    await continueBtn.click();
  }

  async finish() {
    const finishBtn = await this.selfHealer.find('#finish');
    await finishBtn.click();
  }

  async getSuccessMessage(): Promise<string | null> {
    const successMsg = await this.selfHealer.find('.complete-header');
    return successMsg.textContent();
  }
}
