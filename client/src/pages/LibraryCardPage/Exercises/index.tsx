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
  createCardForm: any;
}
const Exercises: FC<IProps> = ({ onClose, showExerciseBlock, createCardForm }) => {
  return (
    <>
      {showExerciseBlock ? (
        <ExerciseBlock createCardForm={createCardForm} onClose={onClose} />
      ) : (
        <>
          <Button onClick={onClose} icon={<PlusOutlined />} text="Add exercise" />
          <List />
        </>
      )}
    </>
  );
};

export default Exercises;
