// External
import { FC, useState } from 'react';
import { Input, Select } from 'antd';
// Internal
import { useActionCreator } from 'shared/hooks/useActionCreator';
import Button from 'components/Items/Button';
import { changeExerciseTypeConfirm, confirm } from '../Confirm';

const { Option } = Select;

interface IProps {
  onClose: () => void;
}

const ExerciseBlock: FC<IProps> = ({ onClose }) => {
  const { createExercise } = useActionCreator();

  const [selectedOption, setSelectedOption] = useState('');
  const [exerciseName, setExerciseName] = useState('');

  const handleSubmit = async () => {
    try {
      if (selectedOption && exerciseName) {
        const data = {
          type: selectedOption,
          name: exerciseName,
          content: [],
        };
        createExercise(data);
        onClose();
      }
      // eslint-disable-next-line no-empty
    } catch {}
  };

  const handleChangeExerciseType = (value: string) => {
    if (selectedOption) {
      confirm({ ...changeExerciseTypeConfirm, onOk: () => setSelectedOption(value) });
    } else {
      setSelectedOption(value);
    }
  };

  const handleChangeNameExercise = (e: any) => {
    setExerciseName(e.target.value.trim());
  };

  return (
    <>
      <span>Exercise Name</span>
      <Input onChange={handleChangeNameExercise} />
      <div>
        <Select defaultValue="Select" style={{ width: 120 }} onChange={handleChangeExerciseType} value={selectedOption}>
          <Option value="select">Select</Option>
          <Option value="input">Input</Option>
          <Option value="textArea">Text area</Option>
          <Option value="radio">Radio</Option>
        </Select>
      </div>
      <Button text="Cancel" onClick={onClose} type="default" />
      <Button text="Save" onClick={handleSubmit} type="primary" htmlType="button" />
    </>
  );
};

export default ExerciseBlock;
