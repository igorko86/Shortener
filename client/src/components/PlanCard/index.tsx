// External
import { FC, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { XYCoord } from 'dnd-core';
// Internal
import { DivNameWithPopover } from 'pages/Home/Plan/styles';
import Close from 'shared/assets/icons/close';
import {
  ICard,
  IDropCardInfo,
  IItemInfo,
  IMoveSubCardDragInfo,
  ISubCards,
  ItemTypeCard,
} from 'pages/Home/Plan/interfaces';
import PlanCardContent from './PlanCardContent';
import Button from '../Items/Button';
// Styles
import { DivCard } from './styles';
import EditableTitle from '../Items/EditableTitle';
import { useActionCreator } from '../../shared/hooks/useActionCreator';

interface IDragItem {
  index: number;
  dragIndex: number;
  hoverInd: number;
  id: string;
}

interface IProps {
  card: ICard;
  cardIndex: number;
  onMoveSubCard: (arg: IMoveSubCardDragInfo) => void;
  onMoveCard: (dragIndex: number, hoverItemIndex: number) => void;
  subCards: ISubCards;
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
  card,
  onDropCard,
}) => {
  const { id: cardId, planCardName } = card;
  const [newCardName, setNewCardName] = useState(planCardName);

  const ref = useRef<HTMLDivElement>(null);
  const { updateCardName } = useActionCreator();
  const [isDisabled, setIsDisabled] = useState(true);

  const [{ isDragging, handlerId }, connectDrag] = useDrag(
    {
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
    },
    [cardIndex, onDropCard]
  );

  const [, connectDrop] = useDrop(
    {
      accept: ItemTypeCard.CARD,
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
        const dragIndex = item.index;
        const hoverItemIndex = cardIndex;

        item.dragIndex = typeof item.dragIndex !== 'number' ? dragIndex : item.dragIndex;

        if (item.id === cardId) {
          return;
        }

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

  const handleBluer = async () => {
    if (card.planCardName !== newCardName) {
      const result = newCardName || 'Title';

      setNewCardName(result);
      await updateCardName({ cardId: card.id, cardName: result, cardIndex });
    }
    setIsDisabled(true);
  };

  connectDrag(ref);
  connectDrop(ref);

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
          <EditableTitle
            title={newCardName}
            setName={setNewCardName}
            cardId={cardId}
            handleBluer={handleBluer}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
          />
        </div>
        <Button onClick={handleRemoveCard} icon={<Close />} />
      </DivNameWithPopover>

      <PlanCardContent
        subCardsArray={subCards[cardId] || []}
        onMoveSubCard={onMoveSubCard}
        cardId={cardId}
        canMoveDropSubCard={canMoveDropSubCard}
        removeSubCard={removeSubCard}
      />
    </DivCard>
  );
};

export default PlanCard;
