import { test, expect } from '@playwright/test';

// End-to-end tests for waiting list workflow
test.describe('Waiting List workflow', () => {
  test('complete order button disabled when cart is empty', async ({ page }) => {
    await page.goto('/');
    const completeBtn = page.getByRole('button', { name: 'Complete Order' });
    await expect(completeBtn).toBeDisabled();
  });

  test('adding items enables complete order and completes to waiting list', async ({ page }) => {
    await page.goto('/');
    // Add first available item to cart
    const addToCartBtn = page.getByRole('button', { name: /Add to cart/i }).first();
    await addToCartBtn.click();

    const completeBtn = page.getByRole('button', { name: 'Complete Order' });
    await expect(completeBtn).toBeEnabled();

    // Enter buyer name and complete the order
    const buyerName = page.locator('[data-testid="buyer-name"]');
    await buyerName.fill('Test Buyer');
    await completeBtn.click();

    // Cart should be cleared
    const cartItems = page.locator('[data-testid="cart-item"]');
    await expect(cartItems).toHaveCount(0);

    // Waiting list should contain the completed order
    const waitingItem = page.locator('[data-testid="waiting-item"]').last();
    await expect(waitingItem).toBeVisible();
    await expect(waitingItem).toContainText('Test Buyer');
  });

  test('panel toggle and state persistence across views', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('[data-testid="panel-toggle"]');
    // Switch to Waiting List view
    await toggle.click();
    await expect(page.locator('text=Waiting List')).toBeVisible();

    // Switch back to Menu view and ensure its state persists when toggled back
    await toggle.click();
    await expect(page.locator('text=Menu')).toBeVisible();

    // Ensure there's state when returning to Waiting List
    await toggle.click();
    await expect(page.locator('text=Waiting List')).toBeVisible();
    // Verify a previously created waiting item persists
    const exists = page.locator('[data-testid="waiting-item"]').last().locator('text=Test Buyer');
    await expect(exists).toBeVisible();
  });
});
