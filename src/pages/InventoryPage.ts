import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SelfHealingLocator } from '../ai/selfHealingLocator';

export class InventoryPage extends BasePage {
  private selfHealer: SelfHealingLocator;

  constructor(page: Page) {
    super(page);
    this.selfHealer = new SelfHealingLocator(page);
  }

  async addItemToCart(itemName: string) {
    // For example, we expect a "add-to-cart-sauce-labs-backpack" button
    const buttonSelector = `button[name="add-to-cart-sauce-labs-${itemName}"]`;
    const button = await this.selfHealer.find(buttonSelector);
    await button.click();
  }

  async openCart() {
    const cartLink = await this.selfHealer.find('.shopping_cart_link','shoppingcartlink');
    await cartLink.click();
  }
}
