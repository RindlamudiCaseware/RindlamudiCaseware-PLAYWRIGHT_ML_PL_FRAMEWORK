import { Page } from '@playwright/test';
import { Logger } from '../utils/logger';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string) {
    Logger.info(`Navigating to path: ${path}`);
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
