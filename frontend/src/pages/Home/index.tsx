import { FC, useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AuthContext } from '../../shared/context/authContext';
import { UserType } from '../../shared/interfaces';
import Tutor from '../../features/Tutor';
import User from '../../features/User';
import Learner from '../../features/Learner';

import { WrapperDiv } from './styles';

const Home: FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <DndProvider backend={HTML5Backend}>
      <WrapperDiv>
        {!user && <User />}
        {user?.type === UserType.Tutor && <Tutor />}
        {user?.type === UserType.Learner && <Learner />}
        {/* <GerundsInfinitives />*/}
      </WrapperDiv>
    </DndProvider>
  );
};

export default Home;
