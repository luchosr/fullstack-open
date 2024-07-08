const { test, describe, expect, beforeEach } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

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
      await createBlog(page, {
        title: 'Testing the title',
        author: 'Playwright',
        url: 'www.playwright.com',
      });
    });

    // Sometimes you will need to stop and re run all suites (vite, backend and playwright),
    // for make a cleanup and then run the tests successfully
    //  if you have a JWT problem, do a manual login for the user

    test('a new blog can be created', async ({ page }) => {
      await expect(
        page.getByText('A new blog Testing the title is added by Playwright')
      ).toBeVisible();

      await expect(page.getByText('Testing the title')).toBeVisible();
      await expect(page.getByText('Playwright')).toBeVisible();
    });

    test('blog likes can be edited', async ({ page }) => {
      await page.getByRole('button', { name: 'Show details' }).click();

      await page.getByText('like it!').click();

      await expect(page.getByText('Likes: 1')).toBeVisible();
    });

    test('a blog can be removed', async ({ page }) => {
      await page.getByRole('button', { name: 'Show details' }).click();

      await page.getByText('Remove').click();

      await page.on('dialog', (dialog) => dialog.accept());

      await expect(
        page.getByText('Testing the remove button')
      ).not.toBeVisible();
    });
  });
});
