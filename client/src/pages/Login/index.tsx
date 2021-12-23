// External
import { FC } from 'react';
// Internal
import LoginForm from 'components/LoginForm';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { Role } from 'shared/models/request/authRequest';

const Login: FC = () => {
  const { login } = useActionCreator();

  const handleSubmit = async (values: any) => {
    login({ ...values, role: values.isTutor ? Role.Tutor : Role.Viewer });
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
