// External
import { FC, useCallback } from 'react';
import { Space } from 'antd';
import update from 'immutability-helper';
// Internal
import ColumnWrapper from 'components/Items/ColumnWrapper';
import Button from 'components/Items/Button';
import { useAppDispatch, useAppSelector } from 'shared/hooks/storeHooks';
import { planSelector } from 'store/reducers/group/selectors';
import { groupActions } from 'store/reducers/group/actionCreators';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import TitleColumn from '../Items/TitleColumn';
import Search from '../Search';
import Cards from './Cards';
// Styles
import { ICard, IDropCardInfo, IItemInfo, IMoveSubCardDragInfo } from './interfaces';

export const cardsArray: ICard[] = [
  {
    id: '1',
    planCardName: '',
  },
];
const { setPlan } = groupActions;

let pendingUpdateFn: any;
let requestedFrame: number | undefined;

const Plan: FC = () => {
  const plan = useAppSelector(planSelector);
  const dispatch = useAppDispatch();
  const { subCards = [], planCards = [], planName = '' } = plan || {};

  const { createPlanCard, deletePlanCard, movePlanCardId, deleteSubCard } = useActionCreator();

  const drawFrame = (): void => {
    if (!plan) return;
    const nextState = update(plan, pendingUpdateFn);

    dispatch(setPlan(nextState));

    pendingUpdateFn = undefined;
    requestedFrame = undefined;
  };

  const handleMoveCard = useCallback(
    (dragIndex: number, hoverItemIndex: number) => {
      if (!plan) return;
      const dragCard = planCards[dragIndex];

      const newPlanCards = {
        planCards: {
          $splice: [
            [dragIndex, 1],
            [hoverItemIndex, 0, dragCard],
          ],
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      pendingUpdateFn = newPlanCards;

      if (!requestedFrame) {
        requestedFrame = requestAnimationFrame(drawFrame);
      }
    },
    [plan]
  );

  const canMoveDropSubCard = ({ dragSubCardId, dragCardId, cardId }: IItemInfo): boolean => {
    return (
      !subCards[cardId] ||
      dragCardId === cardId ||
      (dragCardId !== cardId && !subCards[cardId].some((subCard: any) => subCard.id === dragSubCardId))
    );
  };

  const handleMoveSubCard = useCallback(
    (dragInfo: IMoveSubCardDragInfo) => {
      if (!plan) return;

      const { dragItemIndex, subCardId, currentCardId, hoverItemIndex, dragCardId } = dragInfo;
      const dragCard = subCards[currentCardId][dragItemIndex];
      const canMoveSubCard = canMoveDropSubCard({
        dragSubCardId: subCardId,
        cardId: currentCardId,
        dragCardId,
      });

      if (!dragCard || !canMoveSubCard) {
        dispatch(setPlan({ ...plan, subCards }));
      } else {
        const newSuBCards = update(subCards[currentCardId], {
          $splice: [
            [dragItemIndex, 1],
            [hoverItemIndex, 0, dragCard],
          ],
        });
        dispatch(setPlan({ ...plan, subCards: { ...subCards, [currentCardId]: newSuBCards } }));
      }
    },
    [plan]
  );

  const addCard = async () => {
    if (!plan) return;
    // @ts-ignore
    await createPlanCard(plan.id);
  };

  const removeCard = async (index: number, cardId: string) => {
    if (!plan) return;
    await deletePlanCard(cardId, index);
  };

  const handleDropCard = async (dropCardInfo: IDropCardInfo) => {
    if (!plan) return;

    await movePlanCardId(dropCardInfo);
  };

  const removeSubCard = async (subCardIndex: number, cardId: string) => {
    const newCardsList = JSON.parse(JSON.stringify(subCards));

    const [deletedSubCard] = newCardsList[cardId].splice(subCardIndex, 1);

    await deleteSubCard({ cardId, subCardId: deletedSubCard.id, subCards: newCardsList[cardId] });
  };

  return (
    <ColumnWrapper>
      <TitleColumn title={planName || 'Plan Name'} titlePosition="left" />
      <Search />
      <Cards
        cards={planCards}
        onMoveCard={handleMoveCard}
        removeCard={removeCard}
        onMoveSubCard={handleMoveSubCard}
        subCards={subCards}
        canMoveDropSubCard={canMoveDropSubCard}
        removeSubCard={removeSubCard}
        onDropCard={handleDropCard}
      />
      <Space size="middle">
        <Button onClick={addCard} text="+ Add module" />
      </Space>
    </ColumnWrapper>
  );
};

export default Plan;
