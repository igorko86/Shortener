import styled from 'styled-components';

export const DivListArea = styled.div`
  max-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  min-width: 250px;
  //align-items: center;
  background: ${({ theme }) => theme.colors.brightGray};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin: 10px;
  border-radius: 8px;
  padding: 5px 15px 15px;
  height: fit-content;
`;
