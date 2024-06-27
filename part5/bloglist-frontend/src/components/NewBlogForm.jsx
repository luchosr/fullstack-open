import React, { useState } from 'react';
import blogService from '../services/blogs';

const NewBlogForm = ({ handleSubmit }) => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  return (
    <div>
      <h2>Create new Blog</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(newBlogTitle, newBlogAuthor, newBlogUrl);
          setNewBlogAuthor('');
          setNewBlogTitle('');
          setNewBlogUrl('');
        }}
      >
        <div>
          Title:
          <input
            type="text"
            value={newBlogTitle}
            name="Title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlogAuthor}
            name="Author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={newBlogUrl}
            name="Url"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
