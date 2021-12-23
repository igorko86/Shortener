import { FC } from 'react';
import { Button, Form, Input, Switch } from 'antd';
import { config, FormItem } from 'shared/helpers/formConfig';

interface IProps {
  onSubmit: (values: any) => void;
}

const RegistrationForm: FC<IProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  return (
    <Form onFinish={onSubmit} layout="vertical" form={form} name="register" scrollToFirstError autoComplete="off">
      <Form.Item {...config[FormItem.NAME]}>
        <Input />
      </Form.Item>
      <Form.Item {...config[FormItem.EMAIL]}>
        <Input />
      </Form.Item>
      <Form.Item {...config[FormItem.PASSWORD]}>
        <Input.Password />
      </Form.Item>
      <Form.Item {...config[FormItem.CONFIRM]}>
        <Input.Password />
      </Form.Item>
      <Form.Item name="isTutor" label="Tutor" valuePropName="checked" initialValue>
        <Switch defaultChecked />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
