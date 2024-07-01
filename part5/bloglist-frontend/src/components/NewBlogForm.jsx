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

NewBlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default NewBlogForm;
