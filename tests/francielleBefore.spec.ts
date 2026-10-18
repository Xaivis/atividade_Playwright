import { test, expect } from '@playwright/test';

test.describe('Testes da página de login OrangeHRM', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });
    //Francielle
    test.describe('Testes da página de login OrangeHRM', () => {

        test('1. Validar link Forgot your password?', async ({ page }) => {
            await page.getByText('Forgot your password?').click();
            await expect(page).toHaveURL(/requestPasswordResetCode/);
            await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
        });

        test('2. Validar botão Cancel da recuperação de senha', async ({ page }) => {
            await page.getByText('Forgot your password?').click();
            await page.getByRole('button', { name: 'Cancel' }).click();
            await expect(page).toHaveURL(/auth\/login/);
        });

        test('3. Validar logo do OrangeHRM', async ({ page }) => {
            await expect(page.locator('img').first()).toBeVisible();
        });
    });
});