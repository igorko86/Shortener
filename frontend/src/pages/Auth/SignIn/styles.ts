import styled from 'styled-components';

import { AuthForm, ContentDiv } from '../styles';
import { theme } from '../../../theme';
import { DEVICE } from '../../../shared/constants';

export const SignInContentDiv = styled(ContentDiv)`
  @media ${DEVICE.tablet} {
    flex-direction: column-reverse;
  }
`;

export const SIgnInForm = styled(AuthForm)`
  .ant-form-item:last-of-type {
    border-bottom: 1px solid ${theme.colors.black};
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
  color: ${theme.colors.red};
  position: absolute;
  top: 45px;
  left: 0;
`;
