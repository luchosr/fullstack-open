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

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

// test('there are two blogs', async () => {
//   const response = await api.get('/api/blogs');

//   assert.strictEqual(response.body.length, 2);
// });

// test('the first Blog  is about React patterns', async () => {
//   const response = await api.get('/api/blogs');

//   const titles = await response.body.map((e) => e.title);
//   assert.strictEqual(contents.includes('React patterns'), true);
// });
