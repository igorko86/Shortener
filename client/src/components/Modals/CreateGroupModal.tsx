import { FC } from 'react';
import { Form, Input, Modal } from 'antd';
import * as React from 'react';
import { config, FormItem } from 'shared/helpers/formConfig';

interface IProps {
  visible: boolean;
  onCancel: (showModal: boolean) => void;
}
const CreateGroupModal: FC<IProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const validFields = await form.validateFields();
      console.log(validFields);
    } catch {
      console.log('Validate Failed');
    }
  };
  const handleCancel = () => {
    form.resetFields();
    onCancel(false);
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
      okButtonProps={{ loading: true }}
      cancelButtonProps={{ disabled: true }}
      maskClosable={false}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item {...config[FormItem.PLAN_NAME]}>
          <Input />
        </Form.Item>
        <Form.Item {...config[FormItem.GROUP_NAME]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateGroupModal;
