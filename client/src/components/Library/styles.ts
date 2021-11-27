import styled from 'styled-components';

export const DivListArea = styled.div`
  width: 300px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.brightGray};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin: ${({ theme }) => theme.marginTop};
  border-radius: 8px;
  padding: 15px;
`;

export const ListName = styled.h3`
  color: ${({ theme }) => theme.colors.midnight};
  font-size: 25px;
  margin-bottom: 5px;
`;
