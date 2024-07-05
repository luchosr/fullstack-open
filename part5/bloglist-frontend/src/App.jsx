import { useState, useEffect, useRef } from 'react';

import NewBlogForm from './components/NewBlogForm';
import Toggable from './components/Toggable';

import blogService from './services/blogs';
import loginService from './services/login';

import Bloglist from './components/Bloglist';
import Loginform from './components/Loginform';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
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
      setMessage({ text: 'Wrong credentials', type: 'error' });
      setTimeout(() => {
        setMessage(null);
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

      setMessage({
        text: `A new blog ${title} is added by ${author} `,
        type: 'success',
      });

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      console.log('the error is: ', exception);
    }

    updateBlogsView();
  };

  return (
    <>
      <Toggable buttonLabel="User LogIn" ref={logInFormRef}>
        <Loginform
          message={message}
          onLogInSubmit={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </Toggable>
      <Toggable buttonLabel="Create new Blog">
        <NewBlogForm handleSubmit={handleNewBlogSubmit} />
      </Toggable>

      <Bloglist
        message={message}
        blogUser={user}
        onLogOut={logout}
        newBlogSubmit={handleNewBlogSubmit}
        blogList={blogs}
        likeButtonHandler={handleBlogLikes}
        removeButtonHandler={handleBlogRemove}
      />
    </>
  );
};

export default App;
