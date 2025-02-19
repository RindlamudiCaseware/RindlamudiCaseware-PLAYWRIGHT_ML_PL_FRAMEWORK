import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('Successful login with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Fail login with invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'wrong_pass');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: Username and password do not match');
  });
});
