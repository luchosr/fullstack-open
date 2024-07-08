/* eslint-disable linebreak-style */
import { useRef } from 'react';

import Togglable from './Toggable';

const Blog = ({ blog, updateLikes, removeBlog, userLoggedIn }) => {
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
              className="blog-likes-button"
              style={{ marginLeft: 5 }}
              type="button"
              name="likeUpdate"
              onClick={() => updateLikes(blog)}
            >
              like it!
            </button>
            <p>Author: {blog.author}</p>

            {userLoggedIn ? (
              <button
                type="button"
                name="log out"
                onClick={() => removeBlog(blog)}
              >
                Remove
              </button>
            ) : (
              ''
            )}
          </div>
        </Togglable>
      </div>
    </>
  );
};

export default Blog;
