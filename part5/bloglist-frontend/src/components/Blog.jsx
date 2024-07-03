/* eslint-disable linebreak-style */
import { useRef } from 'react';

import Togglable from './Toggable';

import blogService from '../services/blogs';

const Blog = ({ blog, updateView }) => {
  const blogDetailsRef = useRef();

  return (
    <>
      <div
        className="blog"
        style={{
          border: '1px solid black',
          width: '50%',
          borderRadius: '5px',
          padding: 5,
          margin: 10,
        }}
      >
        <h3 className="blog-title"> {blog.title}</h3>
        <h4 className="blog-author"> {blog.author}</h4>

        <Togglable buttonLabel="Show details" ref={blogDetailsRef}>
          <div className="blog-details">
            <a
              style={{ display: 'block', overflow: 'hidden' }}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="details-url"
            >
              {blog.url}
            </a>
            <p className="blog-likes">Likes: {blog.likes} </p>
            <button
              style={{ marginLeft: 5 }}
              type="button"
              onClick={() => {
                blogService
                  .update(blog.id, {
                    user: blog.user,
                    likes: blog.likes + 1,
                    author: blog.author,
                    title: blog.title,
                    url: blog.url,
                  })
                  .then(() => updateView());
              }}
            >
              like it!
            </button>
            <p>Author: {blog.author}</p>

            <button
              type="button"
              onClick={() => {
                confirm(`remove blog ${blog.title} by ${blog.author}??`)
                  ? blogService.deleteId(blog).then(() => updateView())
                  : '';
              }}
            >
              Remove
            </button>
          </div>
        </Togglable>
      </div>
    </>
  );
};

export default Blog;
