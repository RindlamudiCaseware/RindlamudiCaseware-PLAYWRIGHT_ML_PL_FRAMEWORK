import { FullConfig } from '@playwright/test';
import { Logger } from './utils/logger';

async function globalTeardown(config: FullConfig) {
  Logger.info('Global Teardown: Cleaning up...');
  // e.g. do something after all tests
}

export default globalTeardown;
