// External
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { XYCoord } from 'dnd-core';
// Internal
import { IMoveSubCardDragInfo, ISubCard, ItemTypeCard } from 'components/Plan/interfaces';
import { useActionCreator } from 'shared/hooks/useActionCreator';
// Styles
import { DivSubCard } from './styles';

interface IDragItem {
  hoverSubCardIndex: number;
  subCardId: string;
  cardId: string;
  dragIndex: number;
}

interface IProps {
  subCardIndex: number;
  cardId: string;
  subCardId: string;
  onMoveSubCard: (e: IMoveSubCardDragInfo) => void;
  removeSubCard: (subCardIndex: number, cardId: string) => void;
  subCard: ISubCard;
}

const SubCard: FC<IProps> = ({ subCardIndex, subCardId, onMoveSubCard, cardId, removeSubCard, subCard }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { getCardContent } = useActionCreator();

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypeCard.SUB_CARD,
    item: { hoverSubCardIndex: subCardIndex, cardId, subCardId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ handlerId }, drop] = useDrop({
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
      item.dragIndex = typeof item.dragIndex !== 'number' ? dragItemIndex : item.dragIndex;

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

  const handleShowContent = () => {
    getCardContent(subCard.id);
  };

  const handleRemoveCard = (e: any) => {
    e.stopPropagation();

    removeSubCard(subCardIndex, cardId);
  };

  drag(drop(ref));

  return (
    <DivSubCard
      data-handler-id={handlerId}
      drag={ref}
      isDragging={isDragging}
      card={subCard}
      onRemove={handleRemoveCard}
      onShowContent={handleShowContent}
    />
  );
};

export default SubCard;
