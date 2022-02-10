// External
import { FC } from 'react';
import { PlusOutlined } from '@ant-design/icons';
// Internal
import Button from 'components/Items/Button';
import ExerciseBlock from './ExerciseBlock';
import TableTransfer from './TableTransfer';
import { TabName } from '../helper';

interface IProps {
  onClose: () => void;
  showExerciseBlock: boolean;
  creatingNewCard: boolean;
  activeTab: TabName;
}

const Exercises: FC<IProps> = ({ onClose, showExerciseBlock, creatingNewCard, activeTab }) => {
  return (
    <>
      <ExerciseBlock onClose={onClose} visible={showExerciseBlock} />
      <div>
        <TableTransfer visible={!showExerciseBlock} creatingNewCard={creatingNewCard} activeTab={activeTab} />
      </div>
      {!showExerciseBlock && <Button onClick={onClose} icon={<PlusOutlined />} text="Add exercise" />}
    </>
  );
};

export default Exercises;
