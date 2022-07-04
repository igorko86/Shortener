import styled from 'styled-components';

export const MainDiv = styled.div`
  position: relative;
  max-width: 700px;
  background: ${({ theme }) => theme.colors.light5};
  margin: 0 auto;
  padding: 20px;
`;

export const VerbFormSpan = styled.span`
  display: table;
  margin: 0 auto;
`;
