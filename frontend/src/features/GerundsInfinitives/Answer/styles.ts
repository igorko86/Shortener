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
  margin-top: 25px;
`;
