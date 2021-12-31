// External
import { FC } from 'react';
import { PlusOutlined } from '@ant-design/icons';
// Internal
import Button from 'components/Items/Button';
import List from './List';
import ExerciseBlock from './ExerciseBlock';

interface IProps {
  onClose: () => void;
  showExerciseBlock: boolean;
}
const Exercises: FC<IProps> = ({ onClose, showExerciseBlock }) => {
  return (
    <>
      {showExerciseBlock ? (
        <ExerciseBlock onClose={onClose} />
      ) : (
        <>
          <Button onClick={onClose} icon={<PlusOutlined />} text="Add exercise" />
          <List data={[]} />
        </>
      )}
    </>
  );
};

export default Exercises;
