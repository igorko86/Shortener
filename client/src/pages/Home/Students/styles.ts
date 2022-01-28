import styled from 'styled-components';

export const ItemWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: space-between;
  padding-left: 5px;
  margin-bottom: 5px;

  &:hover {
    background: ${({ theme }) => theme.colors.mainColor};
  }

  button {
    background: none;
    text-align: right;
  }
`;
