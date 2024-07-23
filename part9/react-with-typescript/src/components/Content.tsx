import React from "react";

interface courseInterface {
  name: string;
  exerciseCount: number;
}
interface contentProps {
  courses: courseInterface[];
}

const Content = ({ courses }: contentProps) => {
  return (
    <div>
      {courses.map((course) => (
        <p key={course.name}>
          {course.name}
          {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
