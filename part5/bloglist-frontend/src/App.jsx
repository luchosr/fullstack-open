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
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const compareLikes = (a, b) => {
    if (a.likes > b.likes) {
      return -1;
    }
    if (a.likes < b.likes) {
      return 1;
    }
    return 0;
  };

  const updateBlogsView = async () => {
    const allBlogs = await blogService.getAll();
    setBlogs(allBlogs.sort(compareLikes));
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
      setErrorMessage('Wrong credentials');

      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogListUser');
    setUser(null);
  };

  const handleNewBlogSubmit = (title, author, url) => {
    blogService
      .create({
        title: title,
        author: author,
        url: url,
      })
      .then(() => blogService.getAll())
      .then((blogs) => setBlogs(blogs))
      .then(() =>
        setNewBlog({
          title: title,
          author: author,
          url: url,
        })
      )
      .then(() =>
        setTimeout(() => {
          setNewBlog(null);
        }, 5000)
      );
  };

  return (
    <>
      {user === null ? (
        <Loginform
          errorMessage={errorMessage}
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
