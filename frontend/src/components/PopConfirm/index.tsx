import { FC, ReactNode } from 'react';
import { Popconfirm as PopconfirmAnt } from 'antd';

interface IProps {
  children: ReactNode;
  onConfirm: () => void;
}

const PopConfirm: FC<IProps> = ({ children, onConfirm }) => {
  return (
    <PopconfirmAnt placement="bottomLeft" title="Are you sure?" onConfirm={onConfirm} okText="Yes" cancelText="No">
      {children}
    </PopconfirmAnt>
  );
};

export default PopConfirm;
