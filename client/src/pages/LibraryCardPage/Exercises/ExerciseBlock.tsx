// External
import { FC, useState } from 'react';
import { Button, Form, Input } from 'antd';
// Internal
import { config, FormItem } from 'shared/helpers/formConfig';
import { useActionCreator } from 'shared/hooks/useActionCreator';

interface IProps {
  onClose: () => void;
  createCardForm: any;
}

const ExerciseBlock: FC<IProps> = ({ onClose, createCardForm }) => {
  const { createExercise } = useActionCreator();
  const [creatingExercise, setCreatingExercise] = useState(false);
  const [form] = Form.useForm();
  // console.log(setCreatingExercise);
  const handleSubmit = async () => {
    try {
      const validFields = await form.validateFields();
      const mockData = {
        type: 'Select',
        name: 'Exercise with type Select',
        content: [],
      };
      const exerciseId = await createExercise(mockData);
      console.log(createCardForm.getFieldsValue());
      const arrayIds = createCardForm.getFieldValue('newExercisesIds');
      console.log(arrayIds);
      createCardForm.setFieldsValue({
        ...createCardForm.getFieldsValue(),
        newExercisesIds: arrayIds ? [...arrayIds, exerciseId] : [],
      });
      onClose();
      // eslint-disable-next-line no-empty
    } catch {}
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
