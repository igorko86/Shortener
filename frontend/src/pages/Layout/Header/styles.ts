import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { theme } from '../../../theme';

export const AppHeader = styled.header`
  background: ${theme.colors.dark2};
`;

export const AppSubHeaderNav = styled.nav`
  background: ${theme.colors.theme};
`;

export const HeaderContentDiv = styled.div`
  min-height: 60px;
  background: ${theme.colors.dark2};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoDiv = styled.div``;

export const NavListUl = styled.ul`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 0;
`;

export const ItemNavLink = styled(NavLink)`
  color: ${theme.colors.white};
  font-size: 16px;
  &:hover {
    color: ${theme.colors.light4};
  }
  &.active {
    font-weight: 600;
    border-bottom: 2px solid ${theme.colors.light5};
  }
`;
