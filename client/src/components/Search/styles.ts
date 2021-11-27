import styled from 'styled-components';

export const InputSearch = styled.div`
  width: 275px;
  height: 32px;
  backdrop-filter: blur(4px);
  border: 1px solid ${({ theme }) => theme.colors.silver};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: 15px;
  background: white;
`;
