// External
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { XYCoord } from 'dnd-core';
// Internal
import { DivNameWithPopover } from 'components/Plan/styles';
import { SpanDescription, SpanTitle } from 'components/Items/Card/styles';
import Close from 'shared/assets/icons/close';
import PlanCardContent from './PlanCardContent';
import { IItemInfo, IMoveSubCardDragInfo, ISubCards, ItemTypeCard } from '../Plan';
import Button from '../Items/Button';
// Styles
import { DivCard } from './styles';

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
  removeCard: (index: number) => void;
  removeSubCard: (subCardIndex: number, cardId: string) => void;
}

const PlanCard: FC<IProps> = ({
  canMoveDropSubCard,
  cardId,
  onMoveCard,
  removeCard,
  removeSubCard,
  onMoveSubCard,
  cardIndex,
  subCards,
  setSubCards,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging, handlerId }, drag] = useDrag({
    type: ItemTypeCard.CARD,
    item: { id: cardId, index: cardIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
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
    <DivCard
      ref={ref}
      style={{
        border: isDragging ? '1px solid red' : 'none',
        opacity,
      }}
      data-handler-id={handlerId}
    >
      <DivNameWithPopover>
        <div>
          <SpanTitle>Type - ${cardId}</SpanTitle>
          <SpanDescription>Type - ${cardId}</SpanDescription>
        </div>
        <Button onClick={() => removeCard(cardIndex)} icon={<Close />} />
      </DivNameWithPopover>

      <PlanCardContent
        subCardsArray={subCards[cardId] || []}
        onMoveSubCard={onMoveSubCard}
        setSubCards={setSubCards}
        cardId={cardId}
        canMoveDropSubCard={canMoveDropSubCard}
        removeSubCard={removeSubCard}
      />
    </DivCard>
  );
};

export default PlanCard;
