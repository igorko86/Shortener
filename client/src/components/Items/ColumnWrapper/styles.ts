import styled from 'styled-components';

export const DivListArea = styled.div`
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.brightGray};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin: ${({ theme }) => theme.marginTop};
  border-radius: 8px;
  padding: 15px;
`;
