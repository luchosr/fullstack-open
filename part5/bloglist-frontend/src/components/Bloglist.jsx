/* eslint-disable indent */
import React, { useState } from 'react';
import NewBlogForm from './NewBlogForm';
import Blog from './Blog';
import Notification from './Notification';

const Bloglist = ({
  newBlog,
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

      {newBlog
        ? Notification(
            `a new blog ${newBlog.title} by ${newBlog.author} has been added`
          )
        : ''}
      <h4>
        {blogUser.name} has logged in
        <button type="button" onClick={onLogOut}>
          log out
        </button>
      </h4>

      {toggleBlogForm ? <NewBlogForm handleSubmit={newBlogSubmit} /> : ''}
      <button type="button" onClick={() => setToggleBlogForm(!toggleBlogForm)}>
        {toggleBlogForm ? 'cancel' : 'create new blog'}
      </button>
      {blogList.map((blog) => (
        <Blog key={blog.id} blog={blog} updateView={bloglistUpdate} />
      ))}
    </div>
  );
};

export default Bloglist;
