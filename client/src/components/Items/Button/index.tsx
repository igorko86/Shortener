// External
import { FC, ReactElement } from 'react';
import { ButtonProps } from 'antd/lib/button/button';
// Internal

// Styles
import { ButtonStyle } from './styles';

interface IProps {
  text?: string;
  icon?: ReactElement;
  onClick?: any;
  isDisabled?: boolean;
}

const Button: FC<IProps & ButtonProps> = ({ text, ...props }) => {
  return <ButtonStyle {...props}>{text}</ButtonStyle>;
};

export default Button;
