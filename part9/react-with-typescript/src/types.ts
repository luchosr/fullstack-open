interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasicBackground extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBasicBackground {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBasicBackground {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartBasicBackground {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
