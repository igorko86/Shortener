// Internal
import { FC } from 'react';
import { Button, Form, Input, Switch } from 'antd';
// External
import { config, FormItem } from 'shared/helpers/formConfig';
import { useHistory } from 'react-router-dom';
import AuthService from 'shared/services/AuthService';
import { Role } from 'shared/models/request/authRequest';
import { AppPath } from 'shared/common/enum';
// Styles

const RegistrationForm: FC = () => {
  const [form] = Form.useForm();

  const history = useHistory();

  const handleSubmit = async (values: any) => {
    const { name, email, password } = values;

    await AuthService.register({ name, email, password });

    history.push(AppPath.SUCCESS);
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical" form={form} name="register" scrollToFirstError autoComplete="off">
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
