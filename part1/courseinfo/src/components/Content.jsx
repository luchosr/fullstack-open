import Part from './Part';

const Content = ({ parts }) => {
  console.log('The parts are: ', parts);
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.name} />
      ))}
    </div>
  );
};

export default Content;
