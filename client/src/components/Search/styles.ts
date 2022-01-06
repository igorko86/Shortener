import styled from 'styled-components';

interface IProp {
  isOpen?: boolean;
}

export const InputSearch = styled.div<IProp>`
  width: 100%;
  height: 32px;
  backdrop-filter: blur(4px);
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: 15px;
  background: none;
  display: flex;

  [aria-label='search'] {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.silver};
      }
    }
  }

  button {
    margin-left: 5px;
    box-shadow: none;

    svg {
      margin-right: 0;
      height: 13px;
      transform: ${({ isOpen }) => `rotate(${isOpen ? '0' : '180deg'})`};

      path {
        fill: ${({ theme }) => theme.colors.midnight};
      }
    }
  }
`;
