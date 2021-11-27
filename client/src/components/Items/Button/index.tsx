import React, { FC, ReactElement } from 'react';

import { ButtonStyle } from './styles';

interface IProps {
  text?: string;
  icon?: ReactElement;
  onClick?: any;
}

const Button: FC<IProps> = ({ text, icon, onClick }) => {
  return (
    <ButtonStyle icon={icon} onClick={onClick}>
      {text}
    </ButtonStyle>
  );
};

export default Button;
