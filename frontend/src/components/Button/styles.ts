import styled from 'styled-components';
import { Button as ButtonAnt } from 'antd';

import { theme } from '../../theme';

export const ButtonStyle = styled(ButtonAnt)`
  min-width: 80px;
  font-size: 16px;
  outline: 1px solid ${theme.colors.light3};
  color: ${theme.colors.light1};
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
    opacity: 0.4;
    border: none;
  }

  &.ant-btn:focus {
    outline: 1px solid ${theme.colors.light3};
    color: ${theme.colors.light1};
    border: 0;
  }

  &.ant-btn:hover {
    outline: 1px solid ${theme.colors.theme};
    color: ${theme.colors.theme};
    border: 0;
  }

  &.ant-btn-primary {
    color: ${theme.colors.white};
    background: ${theme.colors.theme};
    border: 0;
    outline: 1px solid ${theme.colors.theme};
  }

  &.ant-btn-primary:focus {
    color: ${theme.colors.white};
    background: ${theme.colors.theme};
    border: 0;
    outline: 1px solid ${theme.colors.theme};
  }

  &.ant-btn-primary:hover {
    color: ${theme.colors.white};
    background: ${theme.colors.light1};
    border: 0;
    outline: 1px solid ${theme.colors.light1};
  }

  &.ant-btn-primary:active,
  &.ant-btn.ant-btn-loading {
    color: ${theme.colors.white};
    background: ${theme.colors.theme};
    border: 0;
    outline: 1px solid ${theme.colors.theme};
  }

  &.ant-btn.ant-btn-background-ghost {
    border: 1px solid ${theme.colors.white};
  }

  &.ant-btn.ant-btn-background-ghost:focus,
  &.ant-btn.ant-btn-background-ghost:hover {
    background: ${theme.colors.theme};
    color: ${theme.colors.light4};
    border-color: ${theme.colors.light4};
  }
`;
