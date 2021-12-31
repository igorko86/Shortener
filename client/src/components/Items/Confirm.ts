import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const confirm = ({ onOk }: { onOk: () => void }) => {
  Modal.confirm({
    title: 'Create card',
    icon: React.createElement(ExclamationCircleOutlined),
    content: 'There is unsaved exercise. Are you sure want to continue?',
    okText: 'Confirm',
    cancelText: 'Cancel',
    onOk: onOk,
    closable: true,
  });
};
