import styled from 'styled-components';

export const DivCard = styled.div`
  min-height: 45px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  width: 275px;
  background: ${({ theme }) => theme.colors.snow};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: move;
  padding-bottom: 5px;
`;

export const DivEmptyCard = styled.div`
  min-height: 100px;
  border: 2px dashed ${({ theme }) => theme.colors.gainsboro};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.whiteSmoke};
  margin: 10px 10px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DivWithContent = styled.div`
  min-height: 100px;
  margin: 10px 10px 5px;
`;

export const SpanEmptyCard = styled.span`
  pointer-events: none;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.pinkSwan};
`;
