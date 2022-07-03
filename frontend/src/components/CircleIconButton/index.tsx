import { FC, ReactNode } from 'react';

import { CircleButton } from './styles';
import { theme } from '../../theme';

interface IProps {
  onClick?: () => void;
  disabled?: boolean;
  backgroundHover?: string;
  children: ReactNode;
}

const CircleIconButton: FC<IProps> = ({ children, backgroundHover, ...props }) => {
  return (
    <CircleButton {...props} $backgroundHover={backgroundHover || theme.colors.theme}>
      {children}
    </CircleButton>
  );
};

export default CircleIconButton;
