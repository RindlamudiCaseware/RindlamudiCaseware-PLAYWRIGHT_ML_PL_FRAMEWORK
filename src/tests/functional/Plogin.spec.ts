import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ ploginPage }) => {
    await ploginPage.open();
  });

  test('Successful login with valid credentials', async ({ ploginPage, page }) => {
    await ploginPage.login('everythingusda175@email.org', 'everythingusda175@email.org');
    // await page.waitForURL('**/leader-hub', { timeout: 90000 });
    // await expect(page).toHaveURL('leader-hub');
   // await expect(page).toHaveURL('leader-hub', { timeout: 90000 });
    await expect.poll(() => page.url(), { timeout: 90000}).toContain('leader-hub');
  });

//   test('Fail login with invalid credentials', async ({ ploginPage }) => {
//     await ploginPage.login('everythingusda175@email.org', 'wrong_pass');
//     const error = await ploginPage.getErrorMessage();
//     expect(error).toContain('Epic sadface: Username and password do not match');
//   });
});
