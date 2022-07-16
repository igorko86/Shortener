import { Link } from 'react-router-dom';
import { Form, Input } from 'antd';
import { LockFilled, MailOutlined } from '@ant-design/icons';

import Button from '../../../components/Button';
import signInImg from '../../../assets/img/signIn.png';
import { AppPagePath } from '../../AppPagePath';
import { useSignIpMutation } from '../../../shared/graphql/auth/useAuthMutations';

import { ContainerDiv, ContentDiv, RegBlkDiv, FormImage, ImgBlkDiv, TitleH2 } from '../styles';
import { SIgnInForm, ActionDiv, ErrorDiv, ItemWrapperDiv } from './styles';
import { INPUT_FIELD_REQUIRED } from '../SignUp/formConfig';
import { useEffect, useState } from 'react';

const SignIn = () => {
  const [form] = Form.useForm();
  const [signIn, { loading, error }] = useSignIpMutation();
  const [signInError, setSignInError] = useState('');

  useEffect(() => {
    if (error?.message) {
      setSignInError(error.message);
    }
  }, [error?.message]);

  const submit = (values: any) => {
    const { email, password } = values;

    form.resetFields();

    signIn({ variables: { password, email } });
  };

  const handleFieldsChange = () => {
    if (signInError) {
      setSignInError('');
    }
  };

  return (
    <ContainerDiv>
      <ContentDiv>
        <ImgBlkDiv>
          <FormImage src={signInImg} alt="Study" />
          <span>
            Create account? <Link to={`/${AppPagePath.SIGNUP}`}>Sign up</Link>
          </span>
        </ImgBlkDiv>
        <RegBlkDiv>
          <TitleH2>Sign In</TitleH2>
          <SIgnInForm
            onFinish={submit}
            onFieldsChange={handleFieldsChange}
            form={form}
            name="login"
            scrollToFirstError
            autoComplete="off"
          >
            <Form.Item
              label={<MailOutlined />}
              name="email"
              rules={[{ required: true, message: INPUT_FIELD_REQUIRED }]}
            >
              <Input placeholder="Your Email" />
            </Form.Item>
            <ItemWrapperDiv>
              <Form.Item
                label={<LockFilled />}
                name="password"
                rules={[{ required: true, message: INPUT_FIELD_REQUIRED }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              {!!signInError && <ErrorDiv>{signInError}</ErrorDiv>}
            </ItemWrapperDiv>
            <ActionDiv>
              <Button type="primary" htmlType="submit" loading={loading}>
                Sign in
              </Button>
              <span>
                <Link to={`/${AppPagePath.SIGNUP}`}>Forgot password?</Link>
              </span>
            </ActionDiv>
          </SIgnInForm>
        </RegBlkDiv>
      </ContentDiv>
    </ContainerDiv>
  );
};

export default SignIn;