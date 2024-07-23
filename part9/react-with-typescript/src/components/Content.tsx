import React from "react";

interface CourseInterface {
  name: string;
  exerciseCount: number;
}
interface ContentProps {
  courses: CourseInterface[];
}

const Content = ({ courses }: ContentProps) => {
  return (
    <div>
      {courses.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
