import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppPagePath } from '../../../../AppPagePath';
import { AuthContext } from '../../../../../shared/context/authContext';
import { useSignOutMutation } from '../../../../../shared/graphql/auth/useAuthMutations';

import { ItemLi } from './styles';

const AvatarPopoverContent: FC = () => {
  const navigate = useNavigate();
  const { ctxSignOut } = useContext(AuthContext);
  const [signOut] = useSignOutMutation();

  const handleSignOut = () => {
    signOut();
    ctxSignOut();
    navigate(`/${AppPagePath.SIGNIN}`);
  };

  return (
    <ul>
      <ItemLi onClick={handleSignOut}>Sign Out</ItemLi>
    </ul>
  );
};

export default AvatarPopoverContent;
