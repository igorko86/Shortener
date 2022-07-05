import styled from 'styled-components';

export const MainDiv = styled.div`
  position: relative;
  max-width: 700px;
  background: ${({ theme }) => theme.colors.light5};
  margin: 0 auto;
  padding: 20px;
`;

export const WrapperDiv = styled.div`
  position: relative;
`;

export const PauseDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(23 37 49 / 46%); // color dark5 with opacity 0.46
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;

export const VerbFormSpan = styled.span`
  display: table;
  margin: 0 auto;
`;
