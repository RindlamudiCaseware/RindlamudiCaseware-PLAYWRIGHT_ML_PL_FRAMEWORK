import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Add to Cart Tests', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Add a product to cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCart('backpack');
    await inventoryPage.openCart();
    const count = await cartPage.getCartItemCount();
    expect(count).toBeGreaterThan(0);
  });
});
