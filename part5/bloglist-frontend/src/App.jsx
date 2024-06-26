import { useState, useEffect } from 'react';

import Blog from './components/Blog';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState(null);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');
  const [toggleBlogForm, setToggleBlogForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const getAllBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

  const Notification = (message) => <div>{message}</div>;
  const logout = () => {
    window.localStorage.removeItem('loggedBlogListUser');
    setUser(null);
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      {errorMessage ? Notification(errorMessage) : ''}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogList = () => (
    <div>
      <h2>blogs</h2>

      {newBlog
        ? Notification(
            `a new blog ${newBlog.title} by ${newBlog.author} has been added`
          )
        : ''}
      <h4>
        {user.name} has logged in{' '}
        <button type="button" onClick={() => logout()}>
          log out
        </button>
      </h4>

      {toggleBlogForm ? (
        <div>
          <h2>Create new Blog</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              blogService
                .create({
                  title: newBlogTitle,
                  author: newBlogAuthor,
                  url: newBlogUrl,
                })
                .then(() => blogService.getAll())
                .then((blogs) => setBlogs(blogs))
                .then(() =>
                  setNewBlog({
                    title: newBlogTitle,
                    author: newBlogAuthor,
                    url: newBlogUrl,
                  })
                )
                .then(() =>
                  setTimeout(() => {
                    setNewBlog(null);
                  }, 5000)
                );
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
      ) : (
        ''
      )}
      <button type="button" onClick={() => setToggleBlogForm(!toggleBlogForm)}>
        {toggleBlogForm ? 'cancel' : 'create new blog'}
      </button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return <>{user === null ? loginForm() : blogList()}</>;
};

export default App;
