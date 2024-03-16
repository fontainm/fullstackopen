import { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  const description = 'description' in props.part ? props.part.description : '';
  let additional = '';

  switch (props.part.kind) {
    case 'group':
      additional = `project exercises ${props.part.groupProjectCount}`;
      break;
    case 'background':
      additional = `submit to ${props.part.backgroundMaterial}`;
      break;
    case 'special':
      additional = props.part.requirements.join(', ');
  }

  return (
    <div style={{marginBottom: '1rem'}}>
      <div>
        <strong>
          {props.part.name} {props.part.exerciseCount}
        </strong>
      </div>
      <div>
        <i>{description}</i>
      </div>
      <div>{additional}</div>
    </div>
  );
};

export default Part;
