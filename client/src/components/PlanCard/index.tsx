// External
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { XYCoord } from 'dnd-core';
// Internal
import { DivNameWithPopover } from 'components/Plan/styles';
import { SpanTitle } from 'components/Items/Card/styles';
import Close from 'shared/assets/icons/close';
import {
  ICard,
  IDropCardInfo,
  IItemInfo,
  IMoveSubCardDragInfo,
  ISubCards,
  ItemTypeCard,
} from 'components/Plan/interfaces';
import PlanCardContent from './PlanCardContent';
import Button from '../Items/Button';
// Styles
import { DivCard } from './styles';

interface IDragItem {
  index: number;
  dragIndex: number;
  hoverInd: number;
}

interface IProps {
  card: ICard;
  cardIndex: number;
  onMoveSubCard: (arg: IMoveSubCardDragInfo) => void;
  onMoveCard: (dragIndex: number, hoverItemIndex: number) => void;
  subCards: ISubCards;
  setSubCards: (callBack: any) => void;
  canMoveDropSubCard: (itemInfo: IItemInfo) => boolean;
  removeCard: (index: number, cardId: string) => void;
  removeSubCard: (subCardIndex: number, cardId: string) => void;
  onDropCard: (dropCardInfo: IDropCardInfo) => void;
}

const PlanCard: FC<IProps> = ({
  canMoveDropSubCard,
  onMoveCard,
  removeCard,
  removeSubCard,
  onMoveSubCard,
  cardIndex,
  subCards,
  setSubCards,
  card,
  onDropCard,
}) => {
  const { id: cardId, planCardName } = card;

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging, handlerId }, drag] = useDrag({
    type: ItemTypeCard.CARD,
    item: { id: cardId, index: cardIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
    end: (item: any) => {
      if (item.dragIndex === item.index) return;

      onDropCard(item);
    },
  });

  const [, drop] = useDrop(
    {
      accept: ItemTypeCard.CARD,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
          isOver: monitor.isOver(),
        };
      },
      hover(item: IDragItem, monitor) {
        // console.log('HERE');
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverItemIndex = cardIndex;

        item.dragIndex = item.dragIndex || dragIndex;

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
    },
    [cardIndex, onDropCard]
  );
  const opacity = isDragging ? 0 : 1;

  const handleRemoveCard = () => {
    removeCard(cardIndex, cardId);
  };

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
          <SpanTitle>{planCardName}</SpanTitle>
        </div>
        <Button onClick={handleRemoveCard} icon={<Close />} />
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
