import { Button, Form, Input } from 'antd';

import { config, FormItem } from './formConfig';

const Signup = () => {
  const [form] = Form.useForm();

  return (
    <Form
      onFinish={() => console.log('SUBMIT')}
      layout="vertical"
      form={form}
      name="register"
      scrollToFirstError
      autoComplete="off"
    >
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;
