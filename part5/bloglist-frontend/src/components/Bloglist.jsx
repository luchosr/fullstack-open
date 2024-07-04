import React from 'react';
import Blog from './Blog';
import Notification from './Notification';

const Bloglist = ({
  message,
  onLogOut,
  blogList,
  likeButtonHandler,
  blogUser,
  removeButtonHandler,
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
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={likeButtonHandler}
          removeBlog={removeButtonHandler}
        />
      ))}
    </div>
  );
};

export default Bloglist;
