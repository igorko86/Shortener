// External
import { FC } from 'react';
import { useDrop } from 'react-dnd';
// Internal
import SubCard from '../SubCard';
import { IItemInfo, IMoveSubCardDragInfo, ISubCard, ISubCards, ItemTypeCard } from '../Plan';

const removeItem = (arr: ISubCard[], id: string) => {
  const index = arr.findIndex((item) => item.id === id);

  arr.splice(index, 1);
  return [...arr];
};

interface IDragInfo {
  cardId?: string;
  hoverSubCardIndex: number;
  subCardId: string;
  id?: string;
}

interface IProps {
  subCardsArray: ISubCard[];
  onMoveSubCard: (arg: IMoveSubCardDragInfo) => void;
  setSubCards: (callBack: any) => void;
  cardId: string;

  canMoveDropSubCard: (itemInfo: IItemInfo) => boolean;
}
const PlanCardContent: FC<IProps> = ({ canMoveDropSubCard, subCardsArray, onMoveSubCard, setSubCards, cardId }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [ItemTypeCard.LIBRARY_CARD, ItemTypeCard.SUB_CARD],
      drop: (dragInfo: IDragInfo) => {
        setSubCards((prevSubCards: ISubCards) => {
          const subCards = prevSubCards[cardId];
          const { cardId: dragCardId, subCardId, id, hoverSubCardIndex } = dragInfo;

          if (!subCards) {
            if (dragCardId) {
              prevSubCards[dragCardId] = removeItem(prevSubCards[dragCardId], subCardId);
            }

            return { ...prevSubCards, [cardId]: [{ id: id || subCardId, cardId }] };
          }

          if (dragCardId) {
            if (cardId !== dragCardId) {
              prevSubCards[dragCardId] = removeItem(prevSubCards[dragCardId], subCardId);

              subCards.splice(hoverSubCardIndex, 0, { id: subCardId, cardId });

              return { ...prevSubCards, [cardId]: [...subCards] };
            }

            return prevSubCards;
          }

          return { ...prevSubCards, [cardId]: [...subCards, { id, cardId }] };
        });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      canDrop: (item: IDragInfo) => {
        const { id, subCardId, cardId: dragCardId } = item;

        return canMoveDropSubCard({ dragSubCardId: id || subCardId, dragCardId: dragCardId || '', cardId });
      },
    }),
    [canMoveDropSubCard]
  );

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return 'rgb(188,251,255)';
      }
      if (!canDrop) {
        return 'rgb(255,188,188)';
      }
    }

    return '';
  };

  return (
    <div style={{ height: '300px', backgroundColor: getBackgroundColor() }} ref={drop}>
      {subCardsArray.map((subCard, index) => {
        return (
          <SubCard
            onMoveSubCard={onMoveSubCard}
            key={subCard.id}
            subCardId={subCard.id}
            subCardIndex={index}
            cardId={cardId}
          />
        );
      })}
    </div>
  );
};

export default PlanCardContent;
