import React from "react";

const Total = ({ totalExercises }: { totalExercises: number }) => {
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  );
};

export default Total;
