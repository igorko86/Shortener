import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const AppHeader = styled.header`
  background: ${({ theme }) => theme.colors.dark2};
`;

export const HeaderContentDiv = styled.div`
  min-height: 80px;
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
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  &:hover {
    color: ${({ theme }) => theme.colors.light4};
  }
  &.active {
    font-weight: 600;
    border-bottom: 2px solid ${({ theme }) => theme.colors.light5};
  }
`;
