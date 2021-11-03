import React, { FC } from 'react';
import { useDrag } from 'react-dnd';

const styleCard = { width: '300px', height: '100px', border: '1px solid red' };

interface IProps {
  title: string;
  item: any;
}
const Card: FC<IProps> = ({ title, item }) => {
  const [, drag] = useDrag(() => ({
    type: 'Card',
    item: { item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div style={styleCard} ref={drag}>
      {title}
    </div>
  );
};

export default Card;
