import styled from 'styled-components';

export const DivScrollZone = styled.div`
  width: 280px;
  height: 600px;
  overflow: auto;
  border: solid 2px green;
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
