import styled from 'styled-components';

import { AuthForm } from '../styles';

export const SignUpForm = styled(AuthForm)`
  .ant-form-item:last-of-type {
    border-bottom: 0;
  }
`;

export const ImageWrapperDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
