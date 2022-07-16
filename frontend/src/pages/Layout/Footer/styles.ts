import styled from 'styled-components';

export const AppWrapperDiv = styled.div`
  margin: 0 20px;
`;

export const AppFooter = styled.footer`
  min-height: 80px;
  background: ${({ theme }) => theme.colors.dark2};
`;
