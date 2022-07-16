import styled from 'styled-components';
import { AuthForm } from '../styles';

export const SIgnInForm = styled(AuthForm)`
  .ant-form-item:last-of-type {
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  }
`;

export const ActionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ItemWrapperDiv = styled.div`
  position: relative;
`;

export const ErrorDiv = styled.div`
  color: ${({ theme }) => theme.colors.red};
  position: absolute;
  top: 45px;
  left: 0;
`;
