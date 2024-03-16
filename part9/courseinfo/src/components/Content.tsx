interface Exercise {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: Array<Exercise>;
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <>
      <p>
        {props.parts[0].name} {props.parts[0].exerciseCount}
      </p>
      <p>
        {props.parts[1].name} {props.parts[1].exerciseCount}
      </p>
      <p>
        {props.parts[2].name} {props.parts[2].exerciseCount}
      </p>
    </>
  );
};

export default Content;
