// Internal
import { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import moment, { Moment } from 'moment-timezone';
import jwt from 'jwt-decode';
// External
import { config, FormItem } from 'shared/helpers/formConfig';
import { Role } from 'shared/models/request/authRequest';
import AuthService from 'shared/services/AuthService';
import { AppPath } from 'shared/common/enum';
// Styles

const ResetPassword: FC = () => {
  const [form] = Form.useForm();
  const { id: parId } = useParams<{ id: string }>();
  const history = useHistory();
  const { id, expLink, role } = jwt<{ id: string; expLink: Moment; role: Role }>(parId);

  if (!moment(expLink).isAfter(moment())) {
    history.push(AppPath.ROOT);
  }

  const handleSubmit = async (values: any) => {
    try {
      await AuthService.resetPassword({ password: values.password, role, id });

      history.push(AppPath.LOGIN);
    } catch {
      history.push(AppPath.ROOT);
    }
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical" form={form} name="Login" scrollToFirstError autoComplete="off">
      <Form.Item {...config[FormItem.PASSWORD]}>
        <Input.Password />
      </Form.Item>
      <Form.Item {...config[FormItem.CONFIRM]}>
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

export default ResetPassword;
