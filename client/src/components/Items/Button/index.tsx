import { FC, ReactElement } from 'react';

import { ButtonStyle } from './styles';

interface IProps {
  text?: string;
  icon?: ReactElement;
  onClick?: any;
  isDisabled?: boolean;
}

const Button: FC<IProps> = ({ text, ...props }) => {
  return <ButtonStyle {...props}>{text}</ButtonStyle>;
};

export default Button;
