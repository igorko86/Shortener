// External
import { FC, useState } from 'react';
import { Form, Input, Modal } from 'antd';
// Internal
import { config, FormItem } from 'shared/helpers/formConfig';
import StudentService from 'shared/services/StudentService';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { userSelector } from 'store/reducers/auth/selectors';
import GroupsSelect from './GroupsSelect';

interface IProps {
  visible: boolean;
  onCancel: (showModal: boolean) => void;
}

const AddNewStudentModal: FC<IProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const user = useAppSelector(userSelector);
  const [creating, setCreating] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    onCancel(false);
  };

  const handleSubmit = async () => {
    setCreating(true);

    try {
      const validFields = await form.validateFields();

      if (user) {
        StudentService.addNewStudent({ ...validFields, userId: user.id });
      }

      handleCancel();
      setCreating(false);
    } catch {
      setCreating(false);
      console.log('Validate Failed');
    }
  };

  const changeFormValue = (value: string) => {
    form.setFieldsValue({ groupId: value });
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
          <Input disabled={creating} placeholder="Name" />
        </Form.Item>
        <Form.Item {...config[FormItem.EMAIL]}>
          <Input disabled={creating} placeholder="Email" />
        </Form.Item>
        <Form.Item name="groupId" label="Group name">
          <GroupsSelect changeFormValue={changeFormValue} disabled={creating} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewStudentModal;
