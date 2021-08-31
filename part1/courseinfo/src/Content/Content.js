import React from "react";
import Part from "../Part/Part";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part part={part.name} exercises={part.exercises} key={index} />
      ))}
    </>
  );
};

export default Content;
