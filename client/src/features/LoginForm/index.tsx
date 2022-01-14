// External
import { FC } from 'react';
import { Button, Form, Input, Switch } from 'antd';
import { Link } from 'react-router-dom';
// Internal
import { config, FormItem } from 'shared/helpers/formConfig';
import { AppPath } from 'shared/common/enum';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { Role } from 'shared/models/request/authRequest';

const LoginForm: FC = () => {
  const [form] = Form.useForm();

  const { login } = useActionCreator();

  const handleSubmit = async (values: any) => {
    login({ ...values, role: values.isTutor ? Role.Tutor : Role.Viewer });

    form.resetFields();
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical" form={form} name="Login" scrollToFirstError autoComplete="off">
      <Form.Item {...config[FormItem.EMAIL]}>
        <Input />
      </Form.Item>
      <Form.Item {...config[FormItem.PASSWORD]}>
        <Input.Password />
      </Form.Item>
      <Form.Item name="isTutor" label="Tutor" valuePropName="checked" initialValue>
        <Switch defaultChecked />
      </Form.Item>
      <Link to={AppPath.FORGOT_PASSWORD}>Forgot password</Link>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
