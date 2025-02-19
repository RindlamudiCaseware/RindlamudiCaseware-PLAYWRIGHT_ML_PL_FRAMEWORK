import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { waitForCondition } from '../utils/waitForCondition';
import { SelfHealingLocator } from '../ai/selfHealingLocator';


export class LoginPage extends BasePage {
  private selfHealer: SelfHealingLocator;

  constructor(page: Page) {
    super(page);
    this.selfHealer = new SelfHealingLocator(page);
  }

  async open() {
    await this.navigate('/');
  }

  async login(username: string, password: string) {
    const userField = await this.selfHealer.find('#user-nam',"username");
    await userField.fill(username);

    const passField = await this.selfHealer.find('#passwor',"password");
    await passField.fill(password);

    const loginBtn = await this.selfHealer.find('#login-button',"loginbutton");
    await loginBtn.click();
  }

  async waitForOrderCompletion(orderId: string): Promise<void> {
    await waitForCondition(async () => {
      const status = await this.page.textContent(`#order-status-${orderId}`);
      return status?.trim() === 'Completed';
    }, 30000, 2000); // wait up to 30s, checking every 2s
  }

  async getErrorMessage(): Promise<string | null> {
    const errorContainer = await this.selfHealer.find('.error-message-container');
    return errorContainer.textContent();
  }
}
