/* eslint-disable linebreak-style */
/* eslint-disable indent */
import React, { useState } from 'react';
import NewBlogForm from './NewBlogForm';
import Blog from './Blog';
import Notification from './Notification';

const Bloglist = ({
  message,
  onLogOut,
  blogList,
  bloglistUpdate,
  blogUser,
}) => {
  return (
    <div>
      <h2>blogs</h2>
      {message ? (
        <Notification message={message.text} messageType={message.type} />
      ) : (
        ''
      )}
      {blogUser ? (
        <h4>
          {blogUser.username} is logged in
          <button type="button" onClick={onLogOut}>
            log out
          </button>
        </h4>
      ) : (
        ''
      )}

      {blogList.map((blog) => (
        <Blog key={blog.id} blog={blog} updateView={bloglistUpdate} />
      ))}
    </div>
  );
};

export default Bloglist;
