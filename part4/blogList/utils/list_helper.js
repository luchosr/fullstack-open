const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogList) => {
  if (blogList.length === 0) return null;

  let topBlog = blogList[0];

  blogList.forEach((blog) => {
    if (blog.likes > topBlog.likes) {
      topBlog = blog;
    }
  });

  return {
    title: topBlog.title,
    author: topBlog.author,
    likes: topBlog.likes,
  };
};

const mostBlogs = (blogsList) => {
  if (blogsList.length === 0) return 'there are no blogs on this list';

  const authorBlogCount = {};

  blogsList.forEach((blog) => {
    if (authorBlogCount[blog.author]) {
      authorBlogCount[blog.author]++;
    } else {
      authorBlogCount[blog.author] = 1;
    }
  });

  let maxBlogs = 0;
  let topAuthor = '';

  for (const author in authorBlogCount) {
    if (authorBlogCount[author] > maxBlogs) {
      maxBlogs = authorBlogCount[author];
      topAuthor = author;
    }
  }

  return { author: topAuthor, blogs: maxBlogs };
};

const mostLikes = (blogsList) => {
  if (blogsList.length === 0) return 'there are no blogs on this list';

  const authorLikesCount = {};

  blogsList.forEach((blog) => {
    if (authorLikesCount[blog.author]) {
      authorLikesCount[blog.author] += blog.likes;
    } else {
      authorLikesCount[blog.author] = blog.likes;
    }
  });

  let maxLikes = 0;
  let topAuthor = '';

  for (const author in authorLikesCount) {
    if (authorLikesCount[author] > maxLikes) {
      maxLikes = authorLikesCount[author];
      topAuthor = author;
    }
  }

  return { author: topAuthor, likes: maxLikes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
