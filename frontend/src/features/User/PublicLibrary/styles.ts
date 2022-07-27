import styled from 'styled-components';
import { theme } from '../../../theme';

export const LibrarySection = styled.section`
  background: ${theme.colors.light5};
  box-shadow: ${theme.boxShadow};
`;

export const ActionBlockDiv = styled.div`
  background: ${theme.colors.dark4};
  color: ${theme.colors.white};
`;

export const ListUl = styled.ul`
  padding: 0 3px;
`;

export const ItemLi = styled.li<{ active: boolean }>`
  height: 72px;
  background: ${({ active }) => (active ? theme.colors.theme : '')};
  color: ${({ active }) => (active ? theme.colors.white : '')};
  padding: 3px;
  margin: 3px 0;
  border-radius: ${theme.borderRadius};
  cursor: move;

  &:hover {
    background: ${({ active }) => (active ? '' : theme.colors.light4)};
  }
`;
