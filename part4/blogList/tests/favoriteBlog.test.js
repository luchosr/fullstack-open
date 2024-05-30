const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const blogListData = require('../mocks/blogListData');

describe('favoriteBlog function', () => {
  test('It needs to return the most liked blog on a list', () => {
    const result = listHelper.favoriteBlog(blogListData.listWithSixBlogs);
    assert.deepStrictEqual(result, {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});
