const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const helper = require('./test_helper');

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.listWithTwoBlogs);
});

describe('GET API blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    assert.strictEqual(response.body.length, helper.listWithTwoBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = await response.body.map((e) => e.title);
    assert(titles.includes('React patterns'));
  });

  test('a unique identified is named id and it exists', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    assert.strictEqual(response.body[0].id, '5a422a851b54a676234d17f7');
  });
});

describe('adition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'A new added blog',
      author: 'Loel',
      url: 'loel.com',
      likes: 12,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDB();
    assert.strictEqual(blogsAtEnd.length, helper.listWithTwoBlogs.length + 1);

    const blogs = blogsAtEnd.map((n) => n.title);
    assert(blogs.includes('A new added blog'));
  });

  test('if likes property does not exists, likes will be zero', async () => {
    const newBlog = {
      title: 'How to  complete FSOpen and not die in the try',
      author: 'Loel',
      url: 'loel.com',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const likes = response.body.map((r) => r.likes);
    assert.strictEqual(likes[likes.length - 1], 0);
  });

  test('fails with status code 400 if data invalid', async () => {
    const newBlog = {
      url: 'test.com',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDB();

    assert.strictEqual(blogsAtEnd.length, helper.listWithTwoBlogs.length);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDB();

    assert.strictEqual(blogsAtEnd.length, helper.listWithTwoBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    assert(!titles.includes(blogToDelete.title));
  });
});

describe('update of a blog', () => {
  test('updates the amount of likes', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      ...blogToUpdate,
      likes: 17,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDB();

    assert.strictEqual(blogsAtEnd[0].likes, 17);
  });
});
