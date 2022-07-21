import { FC, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AppPagePath } from '../../AppPagePath';
import Auth from '../../Auth';
import { AuthContext } from '../../../shared/context/authContext';
import { useSignOutMutation } from '../../../shared/graphql/auth/useAuthMutations';

import { LogoDiv, AppHeader, HeaderContentDiv, NavListUl, ItemNavLink } from './styles';
import { AppWrapperDiv } from '../styles';

const Header: FC = () => {
  const navigate = useNavigate();
  const { user, ctxSignOut } = useContext(AuthContext);
  const [signOut] = useSignOutMutation();
  const activeItem = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : '');

  const handleSignOut = () => {
    signOut();
    ctxSignOut();
    navigate(`/${AppPagePath.SIGNIN}`);
  };

  return (
    <AppHeader>
      <AppWrapperDiv>
        <HeaderContentDiv>
          <LogoDiv>
            <Link to={AppPagePath.HOME}>LOGO</Link>
          </LogoDiv>
          <nav>
            <NavListUl>
              <li>
                <ItemNavLink className={activeItem} to={AppPagePath.HOME}>
                  HOME
                </ItemNavLink>
              </li>
              <li>
                <ItemNavLink className={activeItem} to={AppPagePath.CONTACT}>
                  Contact Us
                </ItemNavLink>
              </li>
              <li>
                <ItemNavLink className={activeItem} to={AppPagePath.ABOUT}>
                  About Us
                </ItemNavLink>
              </li>
            </NavListUl>
          </nav>
          {!user ? <Auth /> : <div onClick={handleSignOut}>{user.name}</div>}
        </HeaderContentDiv>
      </AppWrapperDiv>
    </AppHeader>
  );
};

export default Header;
