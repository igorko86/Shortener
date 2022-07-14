import { Form, Input } from 'antd';

import Button from '../../../components/Button';

import { config, FormItem } from './formConfig';
import { ContainerDiv, ContentDiv, FormDiv, ImageDiv, RegisterForm, TitleH2 } from './styles';
import { LockFilled, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

const Signup = () => {
  const [form] = Form.useForm();

  return (
    <ContainerDiv>
      <ContentDiv>
        <FormDiv>
          <TitleH2>Sign Up</TitleH2>
          <RegisterForm
            onFinish={() => console.log('SUBMIT')}
            form={form}
            name="register"
            scrollToFirstError
            autoComplete="off"
          >
            <Form.Item label={<UserOutlined />} {...config[FormItem.NAME]}>
              <Input placeholder="Your Name" />
            </Form.Item>
            <Form.Item label={<MailOutlined />} {...config[FormItem.EMAIL]}>
              <Input placeholder="Yor Email" />
            </Form.Item>
            <Form.Item label={<LockFilled />} {...config[FormItem.PASSWORD]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item label={<LockOutlined />} {...config[FormItem.CONFIRM]}>
              <Input.Password placeholder="Repeat Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </RegisterForm>
        </FormDiv>
        <ImageDiv>Image</ImageDiv>
      </ContentDiv>
    </ContainerDiv>
  );
};

export default Signup;
