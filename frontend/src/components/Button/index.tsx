import { FC, ReactElement } from 'react';
import { ButtonProps } from 'antd/lib/button/button';

import { ButtonStyle } from './styles';

interface IProps {
  text?: string;
  icon?: ReactElement;
  onClick?: () => void;
  isDisabled?: boolean;
  backgroundHover?: string;
}

const Button: FC<IProps & ButtonProps> = ({ text, children, ...props }) => {
  return <ButtonStyle {...props}>{text || children}</ButtonStyle>;
};

export default Button;
