import React from "react";

interface coursePartsInterface {
  name: string;
  exerciseCount: number;
}

const Content = () => {
  return (
    <div>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
    </div>
  );
};

export default Content;
