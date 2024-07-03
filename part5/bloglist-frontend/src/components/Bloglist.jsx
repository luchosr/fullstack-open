/* eslint-disable linebreak-style */
/* eslint-disable indent */
import React, { useState } from 'react';
import NewBlogForm from './NewBlogForm';
import Blog from './Blog';
import Notification from './Notification';

const Bloglist = ({
  message,
  blogUser,
  onLogOut,
  newBlogSubmit,
  blogList,
  bloglistUpdate,
}) => {
  const [toggleBlogForm, setToggleBlogForm] = useState(false);

  return (
    <div>
      <h2>blogs</h2>
      {message ? (
        <Notification message={message.text} messageType={message.type} />
      ) : (
        ''
      )}
      <h4>
        {/* {blogUser.name} has logged in */}
        <button type="button" onClick={onLogOut}>
          log out
        </button>
      </h4>

      {/* {toggleBlogForm ? <NewBlogForm handleSubmit={newBlogSubmit} /> : ''} */}
      {/* <button type="button" onClick={() => setToggleBlogForm(!toggleBlogForm)}>
        {toggleBlogForm ? 'cancel' : 'create new blog'}
      </button> */}
      {blogList.map((blog) => (
        <Blog key={blog.id} blog={blog} updateView={bloglistUpdate} />
      ))}
    </div>
  );
};

export default Bloglist;
