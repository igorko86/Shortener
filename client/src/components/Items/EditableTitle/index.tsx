import { FC, MutableRefObject, useRef } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { EditButton, InputChangeName, InputWrapper } from './styles';
import useCheckAccess from '../../../shared/hooks/useCheckAccess';
import { Role } from '../../../shared/models/request/authRequest';

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
  const forbid = useCheckAccess([Role.Admin, Role.Tutor]);

  const handleClick = () => {
    setIsDisabled(false);
    textInput.current.focus();
    textInput.current.select();
  };

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  return (
    <InputWrapper>
      <InputChangeName
        placeholder="Enter title"
        value={title}
        onChange={(e) => handleChange(e)}
        onBlur={handleBluer}
        style={{ fontSize: cardId ? '15px' : '20px' }}
        ref={textInput}
        readOnly={isDisabled}
        isdisabled={+isDisabled}
      />
      {isDisabled && forbid ? <EditButton onClick={() => handleClick()} icon={<EditOutlined />} /> : ''}
    </InputWrapper>
  );
};

export default EditableTitle;
