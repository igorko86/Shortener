import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';

import forgotPasswordImg from '../../../assets/img/forgotPassword.png';
import { config, FormItem } from '../../../shared/formConfig';
import Button from '../../../components/Button';
import { useForgotPasswordMutation } from '../../../shared/graphql/auth/useAuthMutations';
import { AppPagePath } from '../../AppPagePath';

import { AuthForm, AuthImage, ContainerDiv, ContentDiv, ImgBlkDiv, RegBlkDiv, TitleH2 } from '../styles';

const ForgotPassword: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [submitForgotPassword, { loading }] = useForgotPasswordMutation();

  const handleSubmit = async (values: any) => {
    await submitForgotPassword({
      variables: {
        email: values.email,
      },
    });
    navigate(`/${AppPagePath.SUCCESS}`);
  };

  return (
    <ContainerDiv>
      <ContentDiv>
        <RegBlkDiv>
          <TitleH2>Forgot Password</TitleH2>
          <AuthForm onFinish={handleSubmit} form={form} name="Login" autoComplete="off">
            <Form.Item label={<MailOutlined />} {...config[FormItem.EMAIL]}>
              <Input placeholder="Your Email" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </AuthForm>
        </RegBlkDiv>
        <ImgBlkDiv>
          <AuthImage src={forgotPasswordImg} alt="Study" />
        </ImgBlkDiv>
      </ContentDiv>
    </ContainerDiv>
  );
};

export default ForgotPassword;
