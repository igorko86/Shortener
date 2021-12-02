// External
import { FC } from 'react';
import { useDrop } from 'react-dnd';
// Internal
import { IItemInfo, IMoveSubCardDragInfo, ISubCard, ISubCards, ItemTypeCard } from 'components/Plan/interfaces';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { libraryCardsSelector } from 'store/reducers/library/selectors';
import SubCard from '../SubCard';
// Styles
import { DivEmptyCard, DivWithContent, SpanEmptyCard } from './styles';

const removeItem = (arr: ISubCard[], id: string) => {
  const index = arr.findIndex((item) => item.id === id);

  const [item] = arr.splice(index, 1);

  return { newArr: [...arr], item };
};

interface IDragInfo {
  cardId?: string;
  hoverSubCardIndex: number;
  subCardId: string;
  id?: string;
  libraryCardIndex?: number;
}

interface IProps {
  subCardsArray: ISubCard[];
  onMoveSubCard: (arg: IMoveSubCardDragInfo) => void;
  setSubCards: (callBack: any) => void;
  cardId: string;
  removeSubCard: (subCardIndex: number, cardId: string) => void;
  canMoveDropSubCard: (itemInfo: IItemInfo) => boolean;
}
const PlanCardContent: FC<IProps> = ({
  canMoveDropSubCard,
  subCardsArray,
  onMoveSubCard,
  setSubCards,
  cardId,
  removeSubCard,
}) => {
  const libraryCards = useAppSelector(libraryCardsSelector);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [ItemTypeCard.LIBRARY_CARD, ItemTypeCard.SUB_CARD],
      drop: (dragInfo: IDragInfo) => {
        setSubCards((prevSubCards: ISubCards) => {
          const subCards = prevSubCards[cardId];
          const { cardId: dragCardId, subCardId, hoverSubCardIndex, libraryCardIndex } = dragInfo;
          let libraryCard = null;

          if (typeof libraryCardIndex === 'number') {
            libraryCard = libraryCards[libraryCardIndex];
          }

          if (!subCards) {
            if (dragCardId) {
              const { newArr, item } = removeItem(prevSubCards[dragCardId], subCardId);

              prevSubCards[dragCardId] = newArr;
              libraryCard = item;
            }

            return { ...prevSubCards, [cardId]: [{ ...libraryCard, cardId }] };
          }

          if (dragCardId) {
            if (cardId !== dragCardId) {
              const { newArr, item } = removeItem(prevSubCards[dragCardId], subCardId);

              prevSubCards[dragCardId] = newArr;

              subCards.splice(hoverSubCardIndex, 0, { ...item, cardId });

              return { ...prevSubCards, [cardId]: [...subCards] };
            }

            return prevSubCards;
          }

          return { ...prevSubCards, [cardId]: [...subCards, { ...libraryCard, cardId }] };
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
    [canMoveDropSubCard, libraryCards]
  );

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return 'rgb(195,249,255)';
      }
      if (!canDrop) {
        return 'rgb(255,212,212)';
      }
    }

    return '';
  };

  return (
    <>
      {subCardsArray.length ? (
        <DivWithContent style={{ backgroundColor: getBackgroundColor() }} ref={drop}>
          {subCardsArray.map((subCard, index) => {
            return (
              <SubCard
                onMoveSubCard={onMoveSubCard}
                key={subCard.id}
                subCardId={subCard.id}
                subCardIndex={index}
                cardId={cardId}
                subCard={subCard}
                removeSubCard={removeSubCard}
              />
            );
          })}
        </DivWithContent>
      ) : (
        <DivEmptyCard ref={drop}>
          <SpanEmptyCard>Drop topic here</SpanEmptyCard>
        </DivEmptyCard>
      )}
    </>
  );
};

export default PlanCardContent;
