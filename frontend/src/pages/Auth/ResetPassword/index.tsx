import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input } from 'antd';
import { LockFilled, LockOutlined } from '@ant-design/icons';
import jwt from 'jwt-decode';

import resetPasswordImg from '../../../assets/img/resetPassword.png';
import { config, FormItem } from '../SignUp/formConfig';
import Button from '../../../components/Button';
import { useResetPasswordMutation } from '../../../shared/graphql/auth/useAuthMutations';
import { AppPagePath } from '../../AppPagePath';
import moment, { Moment } from 'moment-timezone';
import { notificationWithIcon } from '../../../shared/notification';

import { AuthForm, AuthImage, ContainerDiv, ContentDiv, ImgBlkDiv, RegBlkDiv, TitleH2 } from '../styles';

interface IJwtData {
  id: string;
  expLink: Moment | null;
  isExpired: boolean;
}

const ResetPassword: FC = () => {
  const { id: hash } = useParams<{ id: string }>();
  const [jwtData, setJwtData] = useState<IJwtData>({
    id: '',
    expLink: null,
    isExpired: false,
  });
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitResetPassword, { loading }] = useResetPasswordMutation();

  const redirectToHome = () => {
    notificationWithIcon('error', 'Link expired');
    navigate(`/${AppPagePath.HOME}`);
  };
  useEffect(() => {
    if (hash) {
      const { id, expLink } = jwt<{ id: string; expLink: Moment }>(hash);

      if (id && expLink && !jwtData.isExpired && moment(expLink).isAfter(moment())) {
        setJwtData((prev) => ({ ...prev, id, expLink }));
      } else if (!jwtData.isExpired) {
        setJwtData((prev) => ({ ...prev, isExpired: true }));
      }
    }
  }, [hash]);

  useEffect(() => {
    if (jwtData.isExpired) {
      redirectToHome();
    }
  }, [jwtData.isExpired]);

  const handleSubmit = async (values: any) => {
    if (jwtData.id && jwtData.expLink && moment(jwtData.expLink).isAfter(moment())) {
      await submitResetPassword({
        variables: {
          password: values.password,
          id: jwtData.id,
        },
      });
      navigate(`/${AppPagePath.SIGNIN}`);
    } else {
      redirectToHome();
    }
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
