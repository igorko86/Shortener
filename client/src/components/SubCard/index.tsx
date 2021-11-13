// External
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { XYCoord } from 'dnd-core';
// Internal
import { IMoveSubCardDragInfo, ItemTypeCard } from 'components/Plan';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

interface IDragItem {
  hoverSubCardIndex: number;
  subCardId: string;
  cardId: string;
}

interface IProps {
  subCardIndex: number;
  cardId: string;
  subCardId: string;
  onMoveSubCard: (e: IMoveSubCardDragInfo) => void;
}

const SubCard: FC<IProps> = ({ subCardIndex, subCardId, onMoveSubCard, cardId }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypeCard.SUB_CARD,
    item: { hoverSubCardIndex: subCardIndex, cardId, subCardId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ handlerId, isOver }, drop] = useDrop({
    accept: ItemTypeCard.SUB_CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
      };
    },
    hover(item: IDragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragItemIndex = item.hoverSubCardIndex;
      const hoverItemIndex = subCardIndex;

      if (dragItemIndex === hoverItemIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragItemIndex < hoverItemIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragItemIndex > hoverItemIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      onMoveSubCard({
        currentCardId: cardId,
        dragItemIndex,
        hoverItemIndex,
        subCardId,
        dragCardId: item.cardId,
      });

      item.hoverSubCardIndex = hoverItemIndex;
    },
  });

  const opacity = isDragging || isOver ? 0.5 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      style={{
        ...style,
        border: '1px solid red',
        opacity,
      }}
    >
      <p>{`SubCard id - ${subCardId}  `}</p>
      <p>{`Card id - ${cardId}  `}</p>
    </div>
  );
};

export default SubCard;
