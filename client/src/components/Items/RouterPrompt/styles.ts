import { Button as ButtonAnt } from 'antd';
import styled from 'styled-components';

export const ButtonStyle = styled(ButtonAnt)<{ backgroundColor?: string }>`
  background: ${({ backgroundColor, type }) => backgroundColor || type};
  border-radius: 4px;
  border: none;

  svg {
    margin-right: 8px;
  }
`;
