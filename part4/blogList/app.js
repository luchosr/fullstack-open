require('dotenv').config();
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const express = require('express');
const app = express();

const morgan = require('morgan');
const Blog = require('./models/blog');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const cors = require('cors');
const mongoose = require('mongoose');

app.use(middleware.tokenExtractor);
app.use(cors());
app.use(express.json());

app.use(morgan('tiny'));
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(url)
  .then((result) => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message);
  });

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;
