import { useState } from 'react';

const Blog = ({ blog }) => {
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
          <p>Likes: {blog.likes}</p>
          <p>Author: {blog.author}</p>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Blog;
