import { Page } from '@playwright/test';
import { CREDENTIALS } from './credentials';

/**
 * Função utilitária para autenticar rapidamente em hooks como beforeEach.
 * Realiza o login com as credenciais padrão do OrangeHRM e aguarda o Dashboard.
 */
export async function loginAsAdmin(page: Page, user = CREDENTIALS.standard) {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Username' }).fill(user.user);
  await page.getByRole('textbox', { name: 'Password' }).fill(user.pass);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(/\/dashboard\/index/);
}
