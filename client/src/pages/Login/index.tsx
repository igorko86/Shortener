// External
import { FC } from 'react';
// Internal
import LoginForm from 'components/LoginForm';
import { useActionCreator } from '../../shared/hooks/useActionCreator';

const Login: FC = () => {
  const { login } = useActionCreator();

  const handleSubmit = async (values: any) => {
    login(values);
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
