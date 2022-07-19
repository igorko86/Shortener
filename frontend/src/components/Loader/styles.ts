import styled, { keyframes } from 'styled-components';

const skCircleBounceDelay = keyframes`
 0% { transform: scale(0); }
 40% { transform: scale(1); }
 80% { transform: scale(0); }
 100% { transform: scale(0); }
`;

export const DivLoader = styled.div<{ position: string; $isPointerEvent?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: ${({ position }) => position};
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  outline: 0;
  background: transparent;
  z-index: 1100;
  user-select: none;
  ${({ $isPointerEvent }) => {
    return $isPointerEvent ? 'pointer-events: none;' : '';
  }}
`;

export const DivSkCircle = styled.div`
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;

  & > div {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    &::before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      background-color: ${({ theme }) => theme.colors.kashmirBlue};
      border-radius: 100%;
      animation: ${skCircleBounceDelay} 1.2s infinite ease-in-out both;
    }

    &:nth-child(2) {
      transform: rotate(30deg);

      &::before {
        animation-delay: -1.1s;
      }
    }

    &:nth-child(3) {
      transform: rotate(60deg);

      &::before {
        animation-delay: -1s;
      }
    }

    &:nth-child(4) {
      transform: rotate(90deg);

      &::before {
        animation-delay: -0.9s;
      }
    }

    &:nth-child(5) {
      transform: rotate(120deg);

      &::before {
        animation-delay: -0.8s;
      }
    }

    &:nth-child(6) {
      transform: rotate(150deg);

      &::before {
        animation-delay: -0.7s;
      }
    }

    &:nth-child(7) {
      transform: rotate(180deg);

      &::before {
        animation-delay: -0.6s;
      }
    }

    &:nth-child(8) {
      transform: rotate(210deg);

      &::before {
        animation-delay: -0.5s;
      }
    }

    &:nth-child(9) {
      transform: rotate(240deg);

      &::before {
        animation-delay: -0.4s;
      }
    }

    &:nth-child(10) {
      transform: rotate(270deg);

      &::before {
        animation-delay: -0.3s;
      }
    }

    &:nth-child(11) {
      transform: rotate(300deg);

      &::before {
        animation-delay: -0.2s;
      }
    }

    &:nth-child(12) {
      transform: rotate(330deg);

      &::before {
        animation-delay: -0.1s;
      }
    }
  }
`;
