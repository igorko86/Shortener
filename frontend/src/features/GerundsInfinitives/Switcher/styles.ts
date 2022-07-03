import styled from 'styled-components';

import Button from '../../../components/Button';

export const SwitcherDiv = styled.div`
  height: 50px;
  background: ${({ theme }) => theme.colors.theme};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Div = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const TextDiv = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.white};
`;
