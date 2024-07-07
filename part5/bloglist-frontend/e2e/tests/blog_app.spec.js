const { test, describe, expect, beforeEach } = require('@playwright/test');

describe('Blogs App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset');
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'luchosr',
        password: 'wordpass',
      },
    });

    await page.goto('http://localhost:5173');
  });

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Blogs App');
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        'Blog app, Department of Computer Science, University of Helsinki 2024'
      )
    ).toBeVisible();
  });

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'Show User LogIn' }).click();

    await expect(page.getByText('Username:')).toBeVisible();
    await expect(page.getByText('Password:')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  describe('Login', () => {
    beforeEach(async ({ page, request }) => {
      await page.getByRole('button', { name: 'Show User LogIn' }).click();
    });

    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('luchosr');
      await page.getByTestId('password').fill('wordpass');

      await page.getByRole('button', { name: 'login' }).click();

      await expect(page.getByText('luchosr is logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('luchosr');
      await page.getByTestId('password').fill('wordpas');

      await page.getByRole('button', { name: 'login' }).click();

      await expect(page.getByText('Wrong credentials')).toBeVisible();
    });
  });
});
