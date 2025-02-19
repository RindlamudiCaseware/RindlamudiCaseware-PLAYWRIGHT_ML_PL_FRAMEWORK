import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { waitForCondition } from '../utils/waitForCondition';
import { SelfHealingLocator } from '../ai/selfHealingLocator';


export class PLoginPage extends BasePage {
  private selfHealer: SelfHealingLocator;

  constructor(page: Page) {
    super(page);
    this.selfHealer = new SelfHealingLocator(page);
  }

  async open() {
    await this.navigate('/');
  }

  async login(username: string, password: string) {
    const userField = await this.selfHealer.find('#Username',"username");
    await userField.fill(username);

    const passField = await this.selfHealer.find('#Password',"password");
    await passField.fill(password);

    const loginBtn = await this.selfHealer.find('#login',"loginbutton");
    await loginBtn.click();
  }
}