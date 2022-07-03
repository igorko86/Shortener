import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { CustomModalDiv } from './styles';

interface IProps {
  visible: boolean;
  children?: ReactNode;
}

const CustomModal: FC<IProps> = ({ visible, children }) => {
  return createPortal(children, document.getElementById('custom-modal') as HTMLElement);

  return visible ? <CustomModalDiv>{children || <div>here</div>}</CustomModalDiv> : null;
};

export default CustomModal;
