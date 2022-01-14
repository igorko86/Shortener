import { FC } from 'react';
import { Result } from 'antd';

const Success: FC = () => {
  return <Result status="success" title="Successfully !" subTitle="On our email has been sent an email!" />;
};

export default Success;
