import { FC } from 'react';
import { Result } from 'antd';

const Success: FC = () => {
  return (
    <Result
      status="success"
      title="Successfully registered!"
      subTitle="On our email has been sent an email for activating. Please activate your account then sign in!"
    />
  );
};

export default Success;
