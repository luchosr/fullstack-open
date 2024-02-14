import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ courses }) => {
  const totalExercisesCalculator = (coursePart) =>
    coursePart.reduce((accumulator, part) => accumulator + part.exercises, 0);

  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total total={totalExercisesCalculator(course.parts)} />
        </div>
      ))}
    </>
  );
};

export default Course;
