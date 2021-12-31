// External
import { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Location } from 'history';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// Internal

interface IProps {
  getFieldsValue: () => any[];
  onOK: () => Promise<boolean>;
  title: string;
  okText: string;
  cancelText: string;
}

const RouterPrompt: FC<IProps> = ({ getFieldsValue, onOK, title, okText, cancelText }) => {
  const history = useHistory();

  const [showPrompt, setShowPrompt] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    history.block((prompt: Location) => {
      const defaultValue = '<p><br></p>'; // default value in reach text editor
      const isValuesNotEmpty = Object.values(getFieldsValue()).some((value) => !!value && value !== defaultValue);

      if (isValuesNotEmpty) {
        setCurrentPath(prompt.pathname);
        setShowPrompt(true);

        return 'true';
      }

      return {};
    });

    return () => {
      history.block(() => ({}));
    };
  }, [history, getFieldsValue]);

  const handleOK = useCallback(async () => {
    if (onOK) {
      const canRoute = await onOK();

      if (canRoute) {
        history.block(() => ({}));
        history.push(currentPath);
      }
    }
  }, [currentPath, history, onOK]);

  const handleCancel = useCallback(async () => {
    const canRoute = await (() => false);

    if (canRoute()) {
      history.block(() => ({}));
      history.push(currentPath);
    }
    setShowPrompt(false);
  }, [currentPath, history]);

  return showPrompt ? (
    <Modal
      visible={showPrompt}
      onOk={handleOK}
      okText={okText}
      onCancel={handleCancel}
      cancelText={cancelText}
      closable
    >
      <span>
        <ExclamationCircleOutlined />
        {title}
        There are unsaved changes. Are you sure want to leave this page ?
      </span>
    </Modal>
  ) : null;
};

export default RouterPrompt;
