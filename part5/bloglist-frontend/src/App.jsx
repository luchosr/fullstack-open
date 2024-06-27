import { useState, useEffect } from 'react';

import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState(null);
  const [toggleBlogForm, setToggleBlogForm] = useState(false);
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

      {toggleBlogForm ? <NewBlogForm handleSubmit={handleNewBlogSubmit} /> : ''}
      <button type="button" onClick={() => setToggleBlogForm(!toggleBlogForm)}>
        {toggleBlogForm ? 'cancel' : 'create new blog'}
      </button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateView={updateBlogsView} />
      ))}
    </div>
  );

  return <>{user === null ? loginForm() : blogList()}</>;
};

export default App;
