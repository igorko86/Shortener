// External
import { FC, useState } from 'react';
import { Button, Form, Input } from 'antd';
// Internal
import { config, FormItem } from 'shared/helpers/formConfig';
// import LibraryService from 'shared/services/LibraryService';

interface IProps {
  onClose: () => void;
}

const ExerciseBlock: FC<IProps> = ({ onClose }) => {
  const [creatingExercise, setCreatingExercise] = useState(false);
  const [form] = Form.useForm();
  // console.log(setCreatingExercise);
  const handleSubmit = () => {
    console.log(form.getFieldsValue());
    onClose();
  };
  return (
    <Form form={form} name="exerciseForm" scrollToFirstError>
      <Form.Item {...config[FormItem.NAME]}>
        <Input />
      </Form.Item>
      <Button loading={creatingExercise} onClick={onClose} type="default">
        Cancel
      </Button>
      <Button loading={creatingExercise} onClick={handleSubmit} type="primary" htmlType="button">
        Save
      </Button>
    </Form>
  );
};

export default ExerciseBlock;
