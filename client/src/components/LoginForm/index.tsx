// External
import { FC } from 'react';
import { Button, Form, Input } from 'antd';
// Internal
import { config, FormItem } from '../RegistrationForm/helper';

interface IProps {
  onSubmit: (values: any) => void;
}

const LoginForm: FC<IProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  return (
    <Form onFinish={onSubmit} layout="vertical" form={form} name="Login" scrollToFirstError autoComplete="off">
      <Form.Item {...config[FormItem.EMAIL]}>
        <Input />
      </Form.Item>
      <Form.Item {...config[FormItem.PASSWORD]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
