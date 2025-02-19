// src/global-setup.ts
import { FullConfig } from '@playwright/test';
import { Logger } from './utils/logger';

export default async function globalSetup(config: FullConfig) {
  Logger.info('Global Setup: Starting...');
  // Perform any setup actions here (e.g., seeding test data)
}
