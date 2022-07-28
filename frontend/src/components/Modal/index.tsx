import React, { FC, ReactNode } from 'react';
import { Modal as ModalAnt, ModalProps } from 'antd';

import Button from '../Button';

interface IProps {
  footer?: ReactNode | null;
  onCancel: () => void;
  loading?: boolean;
  okButtonText?: string | null;
  cancelButtonText?: string | null;
  children: ReactNode;
}

const Modal: FC<IProps & ModalProps> = ({
  cancelButtonText = 'Cancel',
  okButtonText = 'Save',
  onCancel,
  loading,
  children,
  footer,
  ...props
}) => {
  const defaultFooter = (
    <>
      {cancelButtonText && <Button onClick={onCancel}>{cancelButtonText}</Button>}
      {okButtonText && (
        <Button type="primary" loading={loading}>
          {okButtonText}
        </Button>
      )}
    </>
  );
  const customFooter = footer === null || footer ? footer : defaultFooter;

  return (
    <ModalAnt {...props} onCancel={onCancel} footer={customFooter}>
      {children}
    </ModalAnt>
  );
};

export default Modal;
