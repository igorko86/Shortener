// External
import { FC, useCallback, useEffect, useState } from 'react';
import { Space } from 'antd';
import update from 'immutability-helper';
// Internal
import Button from 'components/Items/Button';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { IDropCardInfo, IItemInfo, IMoveSubCardDragInfo } from './interfaces';
import { planSelector } from 'store/reducers/group/selectors';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import TitleColumn from 'components/Items/TitleColumn';
import Search from 'components/Search';
import Cards from './Cards';
import useCheckAccess from 'shared/hooks/useCheckAccess';
import { Role } from 'shared/models/request/authRequest';
// Styles
import { ColumnWrapper } from 'components/Items/Column/styles';

let pendingUpdateFn: any;
let requestedFrame: number | undefined;

const Plan: FC = () => {
  const [newPlanName, setNewPlanName] = useState('');

  const plan = useAppSelector(planSelector);
  const { subCards = [], planCards = [], planName = '' } = plan || {};

  const { createPlanCard, deletePlanCard, movePlanCardId, deleteSubCard, setPlan } = useActionCreator();
  const show = useCheckAccess([Role.Admin, Role.Tutor]);

  useEffect(() => {
    setNewPlanName(planName);
  }, [planName]);

  const drawFrame = (): void => {
    if (!plan) return;
    const nextState = update(plan, pendingUpdateFn);

    setPlan(nextState);

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
        setPlan({ ...plan, subCards });
      } else {
        const newSuBCards = update(subCards[currentCardId], {
          $splice: [
            [dragItemIndex, 1],
            [hoverItemIndex, 0, dragCard],
          ],
        });
        setPlan({ ...plan, subCards: { ...subCards, [currentCardId]: newSuBCards } });
      }
    },
    [plan]
  );

  const addCard = async () => {
    if (!plan) return;

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
      <TitleColumn
        title={plan ? newPlanName : 'Plan Name'}
        setNewPlanName={setNewPlanName}
        isChange
        titlePosition="left"
        plan={plan}
      />
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
      {show && (
        <Space size="middle">
          <Button onClick={addCard} text="+ Add module" />
        </Space>
      )}
    </ColumnWrapper>
  );
};

export default Plan;
