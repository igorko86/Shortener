import styled from 'styled-components';

import { theme } from '../../../theme';

export const TextDiv = styled.div`
  height: 50px;
  font-size: 32px;
  color: ${theme.colors.white};
  background: ${theme.colors.theme};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ExampleP = styled.p`
  width: 90%;
  min-height: 80px;
  font-size: 22px;
  color: ${theme.colors.black};
  background: ${theme.colors.light5};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto 0;
`;
