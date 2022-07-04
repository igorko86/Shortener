import styled from 'styled-components';

export const AnswerHokDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AnswerIcon = styled.span<{ color: string }>`
  position: relative;
  span {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;

    svg {
      fill: ${({ color }) => color};
      width: 30px;
      height: 20px;
    }
  }
`;
