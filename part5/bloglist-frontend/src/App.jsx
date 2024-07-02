/* eslint-disable indent */
import { useState, useEffect } from 'react';

import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';
import Bloglist from './components/Bloglist';
import Loginform from './components/Loginform';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState(null);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const updateBlogsView = async () => {
    const allBlogs = await blogService.getAll();
    setBlogs(allBlogs.sort(compareLikes));
  };

  const compareLikes = (a, b) => {
    if (a.likes > b.likes) {
      return -1;
    }
    if (a.likes < b.likes) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    updateBlogsView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage({ text: 'Wrong credentials', type: 'error' });

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogListUser');
    setUser(null);
  };

  const handleNewBlogSubmit = async (title, author, url) => {
    try {
      await blogService.create({
        title: title,
        author: author,
        url: url,
      });
    } catch (exception) {
      console.log('the error is: ', exception);
    }

    updateBlogsView();
  };

  return (
    <>
      {user === null ? (
        <Loginform
          message={message}
          onLogInSubmit={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <Bloglist
          newBlog={newBlog}
          blogUser={user}
          onLogOut={logout}
          newBlogSubmit={handleNewBlogSubmit}
          blogList={blogs}
          bloglistUpdate={updateBlogsView}
        />
      )}
    </>
  );
};

export default App;
