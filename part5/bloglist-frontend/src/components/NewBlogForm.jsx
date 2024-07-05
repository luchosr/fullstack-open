import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewBlogForm = ({ handleSubmit }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  return (
    <div>
      <h2>Create new Blog</h2>
      <form
        className="blog-form"
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
            id="blogTitle"
            type="text"
            value={newBlogTitle}
            placeholder="add a blog title here"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            id="blogAuthor"
            type="text"
            value={newBlogAuthor}
            placeholder="add a blog author here"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            id="blogUrl"
            type="text"
            value={newBlogUrl}
            placeholder="add a blog url here"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button id="createNewBlogButton" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default NewBlogForm;
