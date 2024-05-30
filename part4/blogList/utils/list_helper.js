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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
