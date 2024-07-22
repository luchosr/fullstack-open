import React from "react";

interface HeaderPops {
  courseName: string;
}

const Header = ({ courseName }: HeaderPops) => {
  return <h1>{courseName}</h1>;
};

export default Header;
