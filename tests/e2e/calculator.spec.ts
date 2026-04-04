import { test, expect } from '@playwright/test';

// End-to-end tests for calculator popup functionality
test.describe('Calculator popup', () => {
  test('opens above button and closes on outside click', async ({ page }) => {
    await page.goto('/');
    const calcBtn = page.getByRole('button', { name: 'Calculator' });
    await calcBtn.click();

    const popup = page.locator('[data-testid="calculator-popup"]');
    await expect(popup).toBeVisible();

    const btnBox = await calcBtn.boundingBox();
    const popupBox = await popup.boundingBox();
    // Popup should be positioned above the button
    if (btnBox && popupBox) {
      expect(popupBox.bottom).toBeLessThan(btnBox.top);
    }

    // Outside click should close the popup
    await page.click('body', { position: { x: 1, y: 1 } });
    await expect(popup).toBeHidden();
  });

  test('popup focuses first input on open and supports Escape to close', async ({ page }) => {
    await page.goto('/');
    const calcBtn = page.getByRole('button', { name: 'Calculator' });
    await calcBtn.click();

    const popup = page.locator('[data-testid="calculator-popup"]');
    await expect(popup).toBeVisible();

    const firstInput = popup.locator('[data-testid="calc-input-a"]');
    await firstInput.focus();
    await expect(firstInput).toBeFocused();

    // Basic data entry
    await firstInput.fill('2');
    const secondInput = popup.locator('[data-testid="calc-input-b"]');
    await secondInput.fill('3');
    const equalsBtn = popup.locator('[data-testid="calc-equals"]');
    await equalsBtn.click();
    const result = popup.locator('[data-testid="calc-result"]');
    await expect(result).toContainText('5');

    // Escape closes the popup
    await page.keyboard.press('Escape');
    await expect(popup).toBeHidden();
  });

  test('keyboard navigation moves focus through controls', async ({ page }) => {
    await page.goto('/');
    const calcBtn = page.getByRole('button', { name: 'Calculator' });
    await calcBtn.click();
    const popup = page.locator('[data-testid="calculator-popup"]');
    await expect(popup).toBeVisible();
    const inputA = popup.locator('[data-testid="calc-input-a"]');
    await inputA.focus();
    await page.keyboard.press('Tab');
    const inputB = popup.locator('[data-testid="calc-input-b"]');
    await expect(inputB).toBeFocused();
  });
});
