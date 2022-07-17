import styled from 'styled-components';
import { Space } from 'antd';

import { theme } from '../../../theme';
import Button from '../../../components/Button';

export const AnswerDiv = styled(Space)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0 10px;
`;

export const AnswerButton = styled(Button)`
  background: ${theme.colors.theme};
  color: ${theme.colors.white};
  margin-top: 25px;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15), 0px 4px 8px rgba(0, 0, 0, 0.15), 0px 8px 16px rgba(0, 0, 0, 0.15),
    0px 16px 32px rgba(0, 0, 0, 0.15);

  &:active:enabled {
    background-color: ${theme.colors.light2};

    transform: translateY(2px);
  }

  &:disabled {
    background-color: ${theme.colors.light4};

    color: black;
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
