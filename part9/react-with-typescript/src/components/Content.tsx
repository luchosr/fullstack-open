import Part from './Part';
import { CoursePart } from '../types';
interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((coursePart) => (
        <Part part={coursePart} />
      ))}
    </div>
  );
};

export default Content;
