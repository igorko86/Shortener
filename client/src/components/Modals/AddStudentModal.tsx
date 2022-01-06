// External
import { FC, useState } from 'react';
import { Form, Input, Modal } from 'antd';
// Internal
import { config, FormItem } from 'shared/helpers/formConfig';
import StudentService from 'shared/services/StudentService';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { userSelector } from 'store/reducers/auth/selectors';

interface IProps {
  visible: boolean;
  onCancel: (showModal: boolean) => void;
}

const AddStudentModal: FC<IProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const tutor = useAppSelector(userSelector);
  const [creating, setCreating] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    onCancel(false);
  };

  const handleSubmit = async () => {
    setCreating(true);

    try {
      const validFields = await form.validateFields();

      if (tutor) {
        StudentService.addNewStudent({ ...validFields, tutorId: tutor.id, groupId: null });
      }

      handleCancel();
      setCreating(false);
    } catch {
      setCreating(false);
      console.log('Validate Failed');
    }
  };

  return (
    <Modal
      title="Modal 1000px width and top 20px"
      style={{ top: 20 }}
      visible={visible}
      okText="Create"
      onOk={handleSubmit}
      onCancel={handleCancel}
      width={1000}
      okButtonProps={{ loading: creating }}
      cancelButtonProps={{ disabled: creating }}
      maskClosable={!creating}
      closable={!creating}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item {...config[FormItem.NAME]} disabled>
          <Input disabled={creating} />
        </Form.Item>
        <Form.Item {...config[FormItem.EMAIL]}>
          <Input disabled={creating} />
        </Form.Item>
        {/* TODO Add select for select group */}
      </Form>
    </Modal>
  );
};

export default AddStudentModal;
