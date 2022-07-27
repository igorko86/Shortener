import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../../components/Button';

interface IProps {
  onCreateCard: () => void;
}

const CreateCard: FC<IProps> = ({ onCreateCard }) => {
  return (
    <div>
      <Button onClick={onCreateCard}>Bact</Button>
    </div>
  );
};

export default CreateCard;
