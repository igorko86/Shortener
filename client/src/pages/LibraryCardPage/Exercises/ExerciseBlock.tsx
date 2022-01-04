// External
import { FC, useState } from 'react';
import { Button, Form, Input } from 'antd';
// Internal
import { config, FormItem } from 'shared/helpers/formConfig';
import { useActionCreator } from 'shared/hooks/useActionCreator';

interface IProps {
  onClose: () => void;
}

const ExerciseBlock: FC<IProps> = ({ onClose }) => {
  const { createExercise } = useActionCreator();
  const [creatingExercise, setCreatingExercise] = useState(false);
  const [form] = Form.useForm();
  // console.log(setCreatingExercise);
  const handleSubmit = async () => {
    try {
      const validFields = await form.validateFields();
      const mockData = {
        type: 'Select',
        name: 'Select',
        content: [],
      };
      createExercise(mockData);

      onClose();
      // eslint-disable-next-line no-empty
    } catch {}
  };

  const onFinishFailed = () => {
    console.log('Submit failed!');
  };

  return (
    <Form form={form} name="exerciseForm" scrollToFirstError onFinishFailed={onFinishFailed}>
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
