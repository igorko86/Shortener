import { Link } from 'react-router-dom';
import { Form, Input, Radio } from 'antd';
import { LockFilled, LockOutlined, MailOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';

import Button from '../../../components/Button';
import RadioButton from '../../../components/RadioButton';
import FormImg from '../../../assets/img/form.png';
import { config, FormItem } from './formConfig';
import { AppPagePath } from '../../AppPagePath';

import { ContainerDiv, ContentDiv, RegBlkDiv, FormImage, RegisterForm, ImgBlkDiv, TitleDiv } from './styles';

const Signup = () => {
  const [form] = Form.useForm();

  return (
    <ContainerDiv>
      <ContentDiv>
        <RegBlkDiv>
          <TitleDiv>
            <h2>Sign Up</h2>
            <span>
              Already have an account? <Link to={`/${AppPagePath.SIGNIN}`}>Sign in</Link>
            </span>
          </TitleDiv>
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
            <Form.Item label={<UserSwitchOutlined />} {...config[FormItem.TYPE]}>
              <Radio.Group>
                <RadioButton value="tutor">Tutor</RadioButton>
                <RadioButton value="user">User</RadioButton>
              </Radio.Group>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </RegisterForm>
        </RegBlkDiv>
        <ImgBlkDiv>
          <FormImage src={FormImg} alt="Study" />
        </ImgBlkDiv>
      </ContentDiv>
    </ContainerDiv>
  );
};

export default Signup;
