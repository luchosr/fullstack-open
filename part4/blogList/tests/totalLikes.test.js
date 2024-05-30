const { test, describe } = require('node:test');
const assert = require('node:assert');
// ...

const listHelper = require('../utils/list_helper');
const blogListData = require('../mocks/blogListData');

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogListData.listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test('when list is empty, it should return 0', () => {
    const result = listHelper.totalLikes(blogListData.emptyList);
    assert.strictEqual(result, 0);
  });

  test('when list is has more than one element, it should return a correct result', () => {
    const result = listHelper.totalLikes(blogListData.listWithSixBlogs);
    assert.strictEqual(result, 36);
  });
});
