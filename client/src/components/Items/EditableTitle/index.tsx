import { FC } from 'react';
import { InputChangeName } from './styles';

interface IProps {
  title: string;
  handleBluer: any;
  setName?: any;
  cardId?: string;
}

const EditableTitle: FC<IProps> = ({ title, setName, cardId, handleBluer }) => {
  const handleClick = (e: any) => {
    e.target.select();
  };

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  return (
    <InputChangeName
      placeholder="Enter title"
      onClick={(e) => handleClick(e)}
      value={title}
      onChange={(e) => handleChange(e)}
      onBlur={handleBluer}
      style={{ fontSize: cardId ? '15px' : '20px' }}
    />
  );
};

export default EditableTitle;
