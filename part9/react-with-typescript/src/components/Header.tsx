import React from "react";

interface HeaderPops {
  name: string;
}

const Header = ({ name }: HeaderPops) => {
  return <h1>{name}</h1>;
};

export default Header;
