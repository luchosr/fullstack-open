const { test, describe, expect, beforeEach } = require('@playwright/test');
const { loginWith } = require('./helper');

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
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'luchosr', 'wordpass');

      await page.getByRole('button', { name: 'login' }).click();

      await expect(page.getByText('luchosr is logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'luchosr', 'wordpas');
      await page.getByRole('button', { name: 'login' }).click();

      await expect(page.getByText('Wrong credentials')).toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'luchosr', 'wordpass');
    });

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new Blog' }).click();
      await page.getByTestId('title').fill('Testing the title');
      await page.getByTestId('author').fill('Playwright');
      await page.getByTestId('url').fill('www.Playwright.com');

      await page.getByRole('button', { name: 'create' }).click();

      await expect(
        page.getByText('A new blog Testing the title is added by Playwright')
      ).toBeVisible();

      await expect(page.getByText('Testing the title')).toBeVisible();
      await expect(page.getByText('Playwright')).toBeVisible();
    });
  });
});
