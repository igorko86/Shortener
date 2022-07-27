import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppPagePath } from '../../AppPagePath';
import Auth from '../../Auth';
import { AuthContext } from '../../../shared/context/authContext';
import Avatar from './Avatar';
import SubHeader from './SubHeader';
import { activeItem } from './helper';

import { LogoDiv, AppHeader, HeaderContentDiv, NavListUl, ItemNavLink, AppSubHeaderNav } from './styles';
import { AppWrapperDiv } from '../styles';

const Header: FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
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
            {user ? <Avatar name={user.name} /> : <Auth />}
          </HeaderContentDiv>
        </AppWrapperDiv>
      </AppHeader>
      {user && (
        <AppSubHeaderNav>
          <AppWrapperDiv>
            <SubHeader />
          </AppWrapperDiv>
        </AppSubHeaderNav>
      )}
    </>
  );
};

export default Header;
