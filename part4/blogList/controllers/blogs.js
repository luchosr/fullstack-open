const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

const { userExtractor } = require('../utils/middleware');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id).populate('user');
  blog ? response.json(blog) : response.status(404).end();
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;

  if (!body.title) {
    return response.status(400).json({ error: 'title missing' });
  } else if (!body.author) {
    return response.status(400).json({ error: 'author missing' });
  }

  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() !== decodedToken.id) {
      return response
        .status(400)
        .json({ error: 'this blog can only be removed by the author.' });
    }

    await Blog.findByIdAndDelete(request.params.id);

    response.status(204).end();
  } catch (exception) {
    console.log(exception);
    response.status(400).json({ error: 'the ID is not found' });
  }
});

blogsRouter.put('/:id', (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const blog = {
    title,
    author,
    url,
    likes,
  };
  if (!title || !author) {
    return response.status(400).json({ error: 'title or author missing' });
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
