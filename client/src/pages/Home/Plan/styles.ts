import styled from 'styled-components';

export const DivScrollZone = styled.div`
  //width: 280px;
  //height: 600px;
  overflow: auto;

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.iron};
  }

  &::-webkit-scrollbar {
    height: 4px;
    width: 4px;
    background-color: transparent;
  }
`;

export const DivNameWithPopover = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 5px 0 15px;
`;

export const SpanAdd = styled.span`
  color: ${({ theme }) => theme.colors.kashmirBlue};
  font-size: 18px;
`;
