import React from 'react';
import Notification from './Notification';

const Loginform = ({
  message,
  onLogInSubmit,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  const hideWhenVisible = { display: loginVisible ? 'none' : '' };
  const showWhenVisible = { display: loginVisible ? '' : 'none' };
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>log in</button>
      </div>
      <h2>Log in to application</h2>
      {message ? (
        <Notification message={message.text} messageType={message.type} />
      ) : (
        ''
      )}
      <form onSubmit={onLogInSubmit}>
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
};

export default Loginform;
