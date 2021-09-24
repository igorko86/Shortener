import { FC } from 'react';

import RegistrationForm from 'components/RegistrationForm';
import { useHistory } from 'react-router-dom';
import AuthService from 'shared/services/AuthService';
import { AppPath } from 'shared/common/enum';

const Registration: FC = () => {
  const history = useHistory();

  const handleSubmit = async (values: any) => {
    const { companyName, email, password } = values;

    await AuthService.register({ name: companyName, email, password });
    history.push(AppPath.SUCCESS);
  };

  return (
    <div>
      <RegistrationForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Registration;
