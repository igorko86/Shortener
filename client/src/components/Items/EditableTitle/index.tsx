import { FC, MutableRefObject, useRef } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { InputChangeName } from './styles';

interface IProps {
  title: string;
  handleBluer: any;
  setName?: any;
  cardId?: string;
  isDisabled: boolean;
  setIsDisabled: any;
}

const EditableTitle: FC<IProps> = ({ title, setName, cardId, handleBluer, isDisabled, setIsDisabled }) => {
  const textInput: MutableRefObject<any> = useRef();

  const handleClick = () => {
    setIsDisabled(false);
    textInput.current.focus();
    textInput.current.select();
  };

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  return (
    <>
      <InputChangeName
        placeholder="Enter title"
        value={title}
        onChange={(e) => handleChange(e)}
        onBlur={handleBluer}
        style={{ fontSize: cardId ? '15px' : '20px' }}
        ref={textInput}
        readOnly={isDisabled}
        isdisabled={isDisabled}
      />
      <Button onClick={() => handleClick()} type="text">
        <EditOutlined />
      </Button>
    </>
  );
};

export default EditableTitle;
