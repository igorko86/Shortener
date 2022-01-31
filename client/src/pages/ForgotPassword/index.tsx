// Internal
import { FC } from 'react';
import { Button, Form, Input, Switch } from 'antd';
import { useHistory } from 'react-router-dom';
// External
import { config, FormItem } from 'shared/helpers/formConfig';
import { Role } from 'shared/models/request/authRequest';
import AuthService from 'shared/services/AuthService';
import { AppPath } from 'shared/common/enum';
// Styles

const ForgotPassword: FC = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const handleSubmit = async (values: any) => {
    const { email } = values;

    try {
      await AuthService.forgotPassword({ email });

      history.push(AppPath.SUCCESS);
    } catch {
      history.push(AppPath.ROOT);
    }
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical" form={form} name="Login" scrollToFirstError autoComplete="off">
      <Form.Item {...config[FormItem.EMAIL]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPassword;
