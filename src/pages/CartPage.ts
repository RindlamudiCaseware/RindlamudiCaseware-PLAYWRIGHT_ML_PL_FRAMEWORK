import { BasePage } from './BasePage';
import { Page } from '@playwright/test';
import { SelfHealingLocator } from '../ai/selfHealingLocator';

export class CartPage extends BasePage {
  private selfHealer: SelfHealingLocator;

  constructor(page: Page) {
    super(page);
    this.selfHealer = new SelfHealingLocator(page);
  }

  async checkout() {
    const checkoutBtn = await this.selfHealer.find('#checkout','checkout');
    await checkoutBtn.click();
  }

  async getCartItemCount(): Promise<number> {
    const items = await this.page.$$('.cart_item');
    return items.length;
  }
}
