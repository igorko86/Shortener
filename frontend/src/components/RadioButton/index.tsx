import { FC } from 'react';

import { AppRadioButton } from './styles';
import { RadioProps } from 'antd/lib/radio/interface';

interface IProps {
  value: string;
}

const RadioButton: FC<IProps & RadioProps> = ({ ...props }) => {
  return <AppRadioButton {...props} />;
};

export default RadioButton;
