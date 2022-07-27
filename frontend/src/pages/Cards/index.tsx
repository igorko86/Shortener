import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Button from '../../components/Button';
import CreateCard from './CreateCard';

const Cards: FC = () => {
  const [isCreateCard, setIsCreateCard] = useState(false);
  const handleClickCreateCard = () => {
    setIsCreateCard((prev) => !prev);
  };
  return (
    <div>
      {isCreateCard ? (
        <CreateCard onCreateCard={handleClickCreateCard} />
      ) : (
        <Button onClick={handleClickCreateCard}>Create Card</Button>
      )}
    </div>
  );
};

export default Cards;
