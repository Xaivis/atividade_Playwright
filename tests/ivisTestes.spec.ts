import { test, expect, Page } from '@playwright/test';
import { loginAsAdmin } from '../config/auth';

// O beforeEach executa o login antes de CADA teste deste bloco
test.beforeEach(async ({ page }) => {
  // Realiza o login completo com as credenciais configuradas
  await loginAsAdmin(page);
});

test.describe('OrangeHRM - Suíte de Testes Autenticados', () => {

  test('Deve acessar o Dashboard após o login no beforeEach', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    const userDropdown = page.getByRole('banner').locator('p');
    await expect(userDropdown).toBeVisible();
  });

  test('Deve exibir o menu lateral com os módulos principais', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'PIM' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Leave' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Time' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  });


});
