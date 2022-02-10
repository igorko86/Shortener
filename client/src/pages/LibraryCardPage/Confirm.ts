import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ModalFuncProps } from 'antd/lib/modal/Modal';

export const confirm = (props: ModalFuncProps) => {
  Modal.confirm(props);
};

export const leaveCreateCardConfirm = {
  title: 'Create card',
  icon: React.createElement(ExclamationCircleOutlined),
  content: 'There is unsaved exercise. Are you sure want to continue?',
  okText: 'Confirm',
  cancelText: 'Cancel',
  closable: true,
};

export const changeExerciseTypeConfirm = {
  title: 'Change type',
  icon: React.createElement(ExclamationCircleOutlined),
  content: 'Please, save exercise ot it will be lost. Are you sure want to continue?',
  okText: 'Confirm',
  cancelText: 'Cancel',
  closable: true,
};
