import { useState, useEffect, useRef } from 'react';

import NewBlogForm from './components/NewBlogForm';
import Toggable from './components/Toggable';

import blogService from './services/blogs';
import loginService from './services/login';

import Bloglist from './components/Bloglist';
import Loginform from './components/Loginform';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loginMessage, setLoginMessage] = useState(null);
  const [newBlogMessage, setNewBlogMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const logInFormRef = useRef();

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
      logInFormRef.current.toggleVisibility();
    } catch (exception) {
      setLoginMessage({ text: 'Wrong credentials', type: 'error' });
      setTimeout(() => {
        setLoginMessage(null);
      }, 6000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogListUser');
    setUser(null);
  };

  const handleBlogLikes = async (blog) => {
    await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    updateBlogsView();
  };

  const handleBlogRemove = (blog) => {
    confirm(`remove blog ${blog.title} by ${blog.author}??`)
      ? blogService.deleteId(blog).then(() => updateBlogsView())
      : '';
  };

  const handleNewBlogSubmit = async (title, author, url) => {
    try {
      await blogService.create({
        title: title,
        author: author,
        url: url,
      });

      setNewBlogMessage({
        text: `A new blog ${title} is added by ${author}`,
        type: 'success',
      });

      setTimeout(() => {
        setNewBlogMessage(null);
      }, 5000);
    } catch (exception) {
      console.log('the error is: ', exception);
    }

    updateBlogsView();
  };

  return (
    <>
      <Toggable buttonLabel="Show User LogIn" ref={logInFormRef}>
        <Loginform
          message={loginMessage}
          onLogInSubmit={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </Toggable>

      <h1>Blogs App</h1>
      <Toggable buttonLabel="Create new Blog">
        <NewBlogForm handleSubmit={handleNewBlogSubmit} />
      </Toggable>

      <Bloglist
        message={newBlogMessage}
        blogUser={user}
        onLogOut={logout}
        newBlogSubmit={handleNewBlogSubmit}
        blogList={blogs}
        likeButtonHandler={handleBlogLikes}
        removeButtonHandler={handleBlogRemove}
      />

      <div className="footer">
        Blog app, Department of Computer Science, University of Helsinki 2024
      </div>
    </>
  );
};

export default App;
