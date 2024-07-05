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
            value={username}
            placeholder="Type your username here"
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            placeholder="Introduce your password"
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Loginform;
