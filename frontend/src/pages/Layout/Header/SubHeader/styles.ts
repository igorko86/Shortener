import styled from 'styled-components';
import { NavLink as RouteNavLink } from 'react-router-dom';

import { theme } from '../../../../theme';

export const SubHeaderDiv = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const NavLink = styled(RouteNavLink)`
  padding: 5px 8px;
  border-radius: 6px;
  color: ${theme.colors.white};

  &:hover {
    color: ${theme.colors.white};
    outline: 1px solid ${theme.colors.light4};
  }

  &.active {
    color: ${theme.colors.white};
    outline: 1px solid ${theme.colors.white};
  }
`;
