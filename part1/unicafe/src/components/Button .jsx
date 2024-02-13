import React from 'react';

const Button = ({ clickHandler, buttonText }) => {
  return <button onClick={clickHandler}>{buttonText}</button>;
};

export default Button;
