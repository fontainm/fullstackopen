import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  parts: Array<CoursePart>;
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <>
      {props.parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </>
  );
};

export default Content;
