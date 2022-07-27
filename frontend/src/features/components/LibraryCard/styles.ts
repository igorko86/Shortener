import styled from 'styled-components';

export const CardDiv = styled.div<{ isOpacity?: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EllipsisSpan = styled.span`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TitleSpan = styled(EllipsisSpan)`
  font-weight: 600;
`;

export const DescriptionSpan = styled(EllipsisSpan)``;
