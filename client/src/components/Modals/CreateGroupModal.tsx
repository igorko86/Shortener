// External
import { FC, useState } from 'react';
import { Form, Input, Modal } from 'antd';
// Internal
import { config, FormItem } from 'shared/helpers/formConfig';
import { useActionCreator } from 'shared/hooks/useActionCreator';

interface IProps {
  visible: boolean;
  onCancel: (showModal: boolean) => void;
}

const CreateGroupModal: FC<IProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [creating, setCreating] = useState(false);
  const { createGroup } = useActionCreator();

  const handleCancel = () => {
    form.resetFields();
    onCancel(false);
  };

  const handleSubmit = async () => {
    setCreating(true);

    try {
      const validFields = await form.validateFields();
      createGroup(validFields);

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
        <Form.Item {...config[FormItem.PLAN_NAME]} disabled>
          <Input disabled={creating} />
        </Form.Item>
        <Form.Item {...config[FormItem.GROUP_NAME]}>
          <Input disabled={creating} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateGroupModal;
