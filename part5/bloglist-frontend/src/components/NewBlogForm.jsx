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
            data-testid="title"
            type="text"
            value={newBlogTitle}
            placeholder="add a blog title here"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            data-testid="author"
            type="text"
            value={newBlogAuthor}
            placeholder="add a blog author here"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            data-testid="url"
            type="text"
            value={newBlogUrl}
            placeholder="add a blog url here"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type="submit" name="create">
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
