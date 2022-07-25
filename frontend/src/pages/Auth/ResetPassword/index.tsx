import { FC } from 'react';
import { Form, Input } from 'antd';
import { LockFilled, LockOutlined } from '@ant-design/icons';

import resetPasswordImg from '../../../assets/img/resetPassword.png';

import { config, FormItem } from '../SignUp/formConfig';
import Button from '../../../components/Button';
import { useResetPasswordMutation } from '../../../shared/graphql/auth/useAuthMutations';

import { AuthForm, AuthImage, ContainerDiv, ContentDiv, ImgBlkDiv, RegBlkDiv, TitleH2 } from '../styles';

const ResetPassword: FC = () => {
  const [form] = Form.useForm();
  const [submitResetPassword, { loading }] = useResetPasswordMutation();

  const handleSubmit = (values: any) => {
    submitResetPassword({
      variables: {
        password: values.password,
      },
    });
  };

  return (
    <ContainerDiv>
      <ContentDiv>
        <ImgBlkDiv>
          <AuthImage src={resetPasswordImg} alt="Study" />
        </ImgBlkDiv>
        <RegBlkDiv>
          <TitleH2>Reset Password</TitleH2>
          <AuthForm onFinish={handleSubmit} form={form} name="Login" autoComplete="off">
            <Form.Item label={<LockFilled />} {...config[FormItem.PASSWORD]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item label={<LockOutlined />} {...config[FormItem.CONFIRM]}>
              <Input.Password placeholder="Repeat Password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </AuthForm>
        </RegBlkDiv>
      </ContentDiv>
    </ContainerDiv>
  );
};

export default ResetPassword;
