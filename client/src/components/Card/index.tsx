// External
import { FC, useRef } from 'react';
import { Card as CardAnt } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import { XYCoord } from 'dnd-core';
// Internal
import CardContent from './CardContent';
import { IItemInfo, IMoveSubCardDragInfo, ISubCards, ItemTypeCard } from '../Plan';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

interface IDragItem {
  index: number;
}

interface IProps {
  cardIndex: number;
  cardId: string;
  onMoveSubCard: (arg: IMoveSubCardDragInfo) => void;
  onMoveCard: (dragIndex: number, hoverItemIndex: number) => void;
  subCards: ISubCards;
  setSubCards: (callBack: any) => void;
  canMoveDropSubCard: (itemInfo: IItemInfo) => boolean;
}

const Card: FC<IProps> = ({
  canMoveDropSubCard,
  cardId,
  onMoveCard,
  onMoveSubCard,
  cardIndex,
  subCards,
  setSubCards,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypeCard.CARD,
    item: { id: cardId, index: cardIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypeCard.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IDragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverItemIndex = cardIndex;

      if (dragIndex === hoverItemIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverItemIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverItemIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMoveCard(dragIndex, hoverItemIndex);

      item.index = hoverItemIndex;
    },
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        ...style,
        border: isDragging ? '1px solid red' : 'none',
        opacity,
      }}
    >
      <CardAnt title={`Title - ${cardId}`} size="small">
        <CardContent
          subCardsArray={subCards[cardId] || []}
          onMoveSubCard={onMoveSubCard}
          setSubCards={setSubCards}
          cardId={cardId}
          canMoveDropSubCard={canMoveDropSubCard}
        />
      </CardAnt>
    </div>
  );
};

export default Card;
