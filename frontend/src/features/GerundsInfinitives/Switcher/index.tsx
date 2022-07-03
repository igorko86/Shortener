import { FC } from 'react';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';

import { Div, SwitcherDiv, TextDiv } from './styles';
import CircleIconButton from '../../../components/CircleIconButton';

interface IProps {
  setCount: (arg: (prev: number) => number) => void;
  count: number;
  maxLength: number;
}

const Switcher: FC<IProps> = ({ setCount, count, maxLength }) => {
  const handelDecrement = () => {
    setCount((prevCount: number) => --prevCount);
  };

  const handelIncrement = () => {
    setCount((prevCount: number) => ++prevCount);
  };

  return (
    <SwitcherDiv>
      <Div>
        <CircleIconButton disabled={!maxLength || count === 0} onClick={handelDecrement}>
          <LeftCircleOutlined aria-hidden="true" />
        </CircleIconButton>
        <TextDiv>{`${maxLength ? count + 1 : maxLength} of ${maxLength}`}</TextDiv>
        <CircleIconButton disabled={!maxLength || count === maxLength - 1} onClick={handelIncrement}>
          <RightCircleOutlined aria-hidden="true" />
        </CircleIconButton>
      </Div>
    </SwitcherDiv>
  );
};

export default Switcher;
