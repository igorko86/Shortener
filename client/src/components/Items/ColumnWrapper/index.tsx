// External
import { FC } from 'react';
// Styles
import { DivListArea } from './styles';

const ColumnWrapper: FC = ({ children }) => {
  return <DivListArea>{children}</DivListArea>;
};

export default ColumnWrapper;
