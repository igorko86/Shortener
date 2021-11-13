import styled from 'styled-components';

export const DivListArea = styled.div`
  max-width: 300px;
  min-width: 300px;
  border-radius: 3px;
  border: 1px solid red;
  max-height: 100%;
  padding: 0 4px;
  background: ${({ theme }) => theme.colors.brightGray};
`;
