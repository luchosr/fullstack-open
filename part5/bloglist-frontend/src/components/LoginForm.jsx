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
  return (
    <div>
      <h2>Log in to application</h2>
      {message ? (
        <Notification message={message.text} messageType={message.type} />
      ) : (
        ''
      )}
      <form onSubmit={onLogInSubmit} className="login-form">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            data-testid="username"
            value={username}
            placeholder="Type your username here"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            data-testid="password"
            value={password}
            placeholder="Introduce your password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" name="login" id="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Loginform;
