// External
import React, { FC } from 'react';
// Internal
import { Button, Popover as PopoverAnt } from 'antd';
import { DivContentPopover } from './styles';
import ThreeDots from '../../shared/assets/icons/threeDots';

interface IProps {
  cardIndex: number;
  removeCard: (index: number) => void;
}

const Popover: FC<IProps> = ({ cardIndex, removeCard }) => {
  const content = (
    <div>
      <Button>
        <p>Rename</p>
      </Button>
      <Button>
        <p>Copy</p>
      </Button>
      <Button onClick={() => removeCard(cardIndex)}>
        <p>Remove</p>
      </Button>
    </div>
  );

  return (
    <DivContentPopover>
      <PopoverAnt placement="bottomRight" content={content} trigger="click">
        <Button>
          <ThreeDots />
        </Button>
      </PopoverAnt>
    </DivContentPopover>
  );
};

export default Popover;
