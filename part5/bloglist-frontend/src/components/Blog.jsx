import { useState } from 'react';

import blogService from '../services/blogs';

const Blog = ({ blog, updateView }) => {
  const [toggleDetails, setToggleDetails] = useState(false);

  return (
    <>
      <div
        style={{
          border: '1px solid black',
          width: '50%',
          borderRadius: '5px',
          padding: 5,
          margin: 10,
        }}
      >
        {blog.title} {blog.author}
        <button
          style={{ marginLeft: 5 }}
          type="button"
          onClick={() => setToggleDetails(!toggleDetails)}
        >
          {toggleDetails ? 'hide' : 'view'}
        </button>
      </div>
      {toggleDetails ? (
        <div
          style={{
            border: '1px solid black',
            width: '50%',
            borderRadius: '5px',
            padding: 5,
            margin: 10,
          }}
        >
          <a
            style={{ display: 'block', overflow: 'hidden' }}
            href={blog.url}
            target="_blank"
          >
            {blog.url}
          </a>
          <p>
            Likes: {blog.likes}{' '}
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
          </p>
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
      ) : (
        ''
      )}
    </>
  );
};

export default Blog;
