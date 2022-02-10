// External
import { FC, useState } from 'react';
import { Input, Select } from 'antd';
// Internal
import { useActionCreator } from 'shared/hooks/useActionCreator';
import Button from 'components/Items/Button';
import { changeExerciseTypeConfirm, confirm } from '../Confirm';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { userSelector } from 'store/reducers/auth/selectors';
import { Type } from 'shared/common/enum';

const { Option } = Select;

interface IProps {
  onClose: () => void;
  visible: boolean;
}

const ExerciseBlock: FC<IProps> = ({ onClose, visible }) => {
  const { createExercise } = useActionCreator();

  const user = useAppSelector(userSelector);

  const [selectedOption, setSelectedOption] = useState('');
  const [exerciseName, setExerciseName] = useState('');

  const handleSubmit = async () => {
    try {
      if (selectedOption && exerciseName) {
        const data = {
          exerciseType: selectedOption,
          name: exerciseName,
          content: [],
          userId: user?.id,
          type: Type.Private,
        };
        createExercise(data);
        onClose();
        setSelectedOption('');
      }
    } catch {
      return null;
    }
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

  return visible ? (
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
  ) : null;
};

export default ExerciseBlock;
