// External
import { FC } from 'react';
import { useDrop } from 'react-dnd';
// Internal
import { IItemInfo, IMoveSubCardDragInfo, ISubCard, ISubCards, ItemTypeCard } from 'components/Plan/interfaces';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { libraryCardsSelector } from 'store/reducers/library/selectors';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import SubCard from '../SubCard';
import { updateSubCards, IDragInfo } from './helper';
// Styles
import { DivEmptyCard, DivWithContent, SpanEmptyCard } from './styles';

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
  const { moveSubCardId } = useActionCreator();

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [ItemTypeCard.LIBRARY_CARD, ItemTypeCard.SUB_CARD],
      drop: (item) => {
        const { hoverSubCardIndex, dragIndex } = item;
        let updatedSubCardsInfo = null;

        if (hoverSubCardIndex && hoverSubCardIndex === dragIndex) return;

        setSubCards((prevSubCards: ISubCards) => {
          updatedSubCardsInfo = updateSubCards({ prevSubCards, dragInfo: item, libraryCards, cardId });

          return updatedSubCardsInfo.updatedSubCards;
        });

        moveSubCardId(updatedSubCardsInfo);
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
