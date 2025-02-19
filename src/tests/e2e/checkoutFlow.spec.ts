import { test, expect } from '../../fixtures/test-fixtures';

test('Complete checkout flow successfully', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addItemToCart('backpack');
  await inventoryPage.openCart();
  await cartPage.checkout();

  await checkoutPage.fillDetails('John', 'Doe', '12345');
  await checkoutPage.finish();

  const successMsg = await checkoutPage.getSuccessMessage();
  expect(successMsg).toContain('THANK YOU FOR YOUR ORDER');
});
