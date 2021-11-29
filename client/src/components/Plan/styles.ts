import styled from 'styled-components';
import { DivListArea } from '../Library/styles';

export const DivListPlanWrapper = styled(DivListArea)`
  position: relative;
`;

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

export const SpanTitle = styled.span`
  color: ${({ theme }) => theme.colors.midnight};
  font-size: 25px;
  margin-bottom: 5px;
`;

export const SpanAdd = styled.span`
  color: ${({ theme }) => theme.colors.kashmirBlue};
  font-size: 18px;
`;

export const DivAddCardWrapper = styled.div`
  padding-top: 5px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  position: absolute;
  bottom: 4px;
`;
