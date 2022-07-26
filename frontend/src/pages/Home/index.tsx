import { FC, useContext } from 'react';

import { AuthContext } from '../../shared/context/authContext';
import { UserType } from '../../shared/interfaces';
import Tutor from '../../features/Tutor';
import User from '../../features/User';
import Learner from '../../features/Learner';

const Home: FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {!user && <User />}
      {user?.type === UserType.Tutor && <Tutor />}
      {user?.type === UserType.Learner && <Learner />}
      {/* <GerundsInfinitives />*/}
    </div>
  );
};

export default Home;
