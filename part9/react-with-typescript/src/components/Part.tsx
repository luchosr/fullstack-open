import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>exercise count: {part.exerciseCount} </p>
          <p>description: {part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>exercise count: {part.exerciseCount}</p>
          <p>groupProjectCount: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>exercise count: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>background Material: {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>exercise count: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>
            requirements: {part.requirements[0]} {part.requirements[1]}
          </p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
