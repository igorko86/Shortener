import React, { FC, ReactElement } from 'react';

import { ButtonStyle } from './styles';

interface IProps {
  text?: string;
  icon?: ReactElement;
  onClick?: any;
  isDisabled?: boolean;
}

const Button: FC<IProps> = ({ text, icon, onClick, isDisabled }) => {
  return (
    <ButtonStyle icon={icon} onClick={onClick} disabled={isDisabled}>
      {text}
    </ButtonStyle>
  );
};

export default Button;
