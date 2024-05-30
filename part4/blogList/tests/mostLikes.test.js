const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const blogListData = require('../mocks/blogListData');

describe('Most Likes', () => {
  test('finds the most liked author on a six blogs list', () => {
    const result = listHelper.mostLikes(blogListData.listWithSixBlogs);
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });

  test('finds an author on an empty blog list', () => {
    const result = listHelper.mostLikes(blogListData.emptyList);
    assert.deepStrictEqual(result, 'there are no blogs on this list');
  });
});
