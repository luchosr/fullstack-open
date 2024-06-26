import React from 'react';
import Notification from './Notification';

const Loginform = ({
  errorMessage,
  onLogInSubmit,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      {errorMessage ? Notification(errorMessage) : ''}
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
