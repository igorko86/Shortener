import styled from 'styled-components';

export const SpanTitleColumn = styled.span`
  color: ${({ theme }) => theme.colors.midnight};
  font-size: 20px;
  margin-bottom: 5px;
`;

export const TitleColumnPosition = styled.div<{ titlePosition?: string }>`
  width: 100%;
  text-align: ${({ titlePosition }) => titlePosition || 'center'};
`;
