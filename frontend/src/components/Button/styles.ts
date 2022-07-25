import styled from 'styled-components';
import { Button as ButtonAnt } from 'antd';

import { theme } from '../../theme';

export const ButtonStyle = styled(ButtonAnt)`
  min-width: 80px;
  font-size: 16px;
  color: ${theme.colors.white};
  background: ${theme.colors.theme};
  line-height: 1;
  border: 0;
  border-radius: 5px;
  box-shadow: none;
  text-shadow: none;

  &.ant-btn[disabled],
  &.ant-btn[disabled]:hover,
  &.ant-btn[disabled]:focus,
  &.ant-btn[disabled]:active {
    background: ${theme.colors.theme};
    color: ${theme.colors.white};
    opacity: 0.3;
    border: none;
  }

  &.ant-btn-primary:focus {
    background: ${theme.colors.theme};
    border: 0;
  }

  &.ant-btn-primary:hover,
  &.ant-btn:hover {
    background: ${theme.colors.light1};
    border: 0;
  }

  &.ant-btn-primary:active,
  &.ant-btn.ant-btn-loading {
    background: ${theme.colors.theme};
    border: 0;
  }
`;
