import { Link } from 'react-router-dom';
import { Form, Input, Radio } from 'antd';
import { LockFilled, LockOutlined, MailOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';

import Button from '../../../components/Button';
import RadioButton from '../../../components/RadioButton';
import signUpImg from '../../../assets/img/signUp.png';
import { config, FormItem, UserType } from './formConfig';
import { AppPagePath } from '../../AppPagePath';
import { useSignUpMutation } from '../../../shared/graphql/auth/useAuthMutations';

import { ContainerDiv, ContentDiv, RegBlkDiv, AuthImage, ImgBlkDiv, TitleH2 } from '../styles';
import { ImageWrapperDiv, SignUpForm } from './styles';

const SignUp = () => {
  const [form] = Form.useForm();
  const [signUp, { loading }] = useSignUpMutation();

  const submit = (values: any) => {
    const { name, type, password, email } = values;

    signUp({ variables: { input: { name, type, password, email } } });
    // form.resetFields();
  };

  return (
    <ContainerDiv>
      <ContentDiv>
        <RegBlkDiv>
          <TitleH2>Sign Up</TitleH2>
          <SignUpForm onFinish={submit} form={form} name="register" scrollToFirstError autoComplete="off">
            <Form.Item label={<UserOutlined />} {...config[FormItem.NAME]}>
              <Input placeholder="Your Name" />
            </Form.Item>
            <Form.Item label={<MailOutlined />} {...config[FormItem.EMAIL]}>
              <Input placeholder="Your Email" />
            </Form.Item>
            <Form.Item label={<LockFilled />} {...config[FormItem.PASSWORD]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item label={<LockOutlined />} {...config[FormItem.CONFIRM]}>
              <Input.Password placeholder="Repeat Password" />
            </Form.Item>
            <Form.Item label={<UserSwitchOutlined />} {...config[FormItem.TYPE]}>
              <Radio.Group>
                <RadioButton value={UserType.Tutor}>Tutor</RadioButton>
                <RadioButton value={UserType.Learner}>Learner</RadioButton>
              </Radio.Group>
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </SignUpForm>
        </RegBlkDiv>
        <ImgBlkDiv>
          <ImageWrapperDiv>
            <AuthImage src={signUpImg} alt="Study" />
          </ImageWrapperDiv>
          <span>
            Already have an account? <Link to={`/${AppPagePath.SIGNIN}`}>Sign in</Link>
          </span>
        </ImgBlkDiv>
      </ContentDiv>
    </ContainerDiv>
  );
};

export default SignUp;
