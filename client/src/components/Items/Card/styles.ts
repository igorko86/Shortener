import styled from 'styled-components';

export const DivCard = styled.div<{ isOpacity?: boolean }>`
  min-height: 45px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  width: 275px;
  background: ${({ theme }) => theme.colors.snow};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 10px;
  cursor: move;
  opacity: ${({ isOpacity }) => (isOpacity ? 0.5 : 1)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SpanTitle = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.midnight};
  display: block;
  word-break: break-word;
`;
export const SpanDescription = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.suvaGrey};
  display: block;
  word-break: break-word;
`;
