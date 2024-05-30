const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const blogListData = require('../mocks/blogListData');

describe('Most Blogs', () => {
  test('finds an author on a six blogs list', () => {
    const result = listHelper.mostBlogs(blogListData.listWithSixBlogs);
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });

  test('finds an author on an empty blog list', () => {
    const result = listHelper.mostBlogs(blogListData.emptyList);
    assert.deepStrictEqual(result, 'there are no blogs on this list');
  });
});
