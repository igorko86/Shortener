// External
import { FC, useCallback, useEffect, useState } from 'react';
import { Space } from 'antd';
import update from 'immutability-helper';
// Internal
import ColumnWrapper from 'components/Items/ColumnWrapper';
import Button from 'components/Items/Button';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { planSelector } from 'store/reducers/group/selectors';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import TitleColumn from '../Items/TitleColumn';
import Search from '../Search';
import Cards from './Cards';
// Styles
import { ICard, IDropCardInfo, IItemInfo, IMoveSubCardDragInfo, ISubCards } from './interfaces';

export const cardsArray: ICard[] = [
  {
    id: '1',
    planCardName: '',
  },
];

const Plan: FC = () => {
  const plan = useAppSelector(planSelector);

  const { createPlanCard, deletePlanCard, movePlanCardId } = useActionCreator();

  const [cards, setCards] = useState<ICard[]>([]);
  const [subCards, setSubCards] = useState<ISubCards>({});

  useEffect(() => {
    if (plan) {
      const { subCards: planSubCards, planCards } = plan;

      setCards([...planCards]);
      setSubCards({ ...planSubCards });
    }
  }, [plan]);

  const handleMoveCard = useCallback(
    (dragIndex: number, hoverItemIndex: number) => {
      setCards((prevCards) => {
        const dragCard = prevCards[dragIndex];

        return update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverItemIndex, 0, dragCard],
          ],
        });
      });
    },
    [cards]
  );

  const canMoveDropSubCard = ({ dragSubCardId, dragCardId, cardId }: IItemInfo): boolean => {
    return (
      !subCards[cardId] ||
      dragCardId === cardId ||
      (dragCardId !== cardId && !subCards[cardId].some((subCard) => subCard.id === dragSubCardId))
    );
  };

  const handleMoveSubCard = useCallback(
    (dragInfo: IMoveSubCardDragInfo) => {
      setSubCards((prevSubCards) => {
        const { dragItemIndex, subCardId, currentCardId, hoverItemIndex, dragCardId } = dragInfo;
        const dragCard = prevSubCards[currentCardId][dragItemIndex];
        const canMoveSubCard = canMoveDropSubCard({
          dragSubCardId: subCardId,
          cardId: currentCardId,
          dragCardId,
        });

        if (!dragCard || !canMoveSubCard) return prevSubCards;

        const newSuBCards = update(prevSubCards[currentCardId], {
          $splice: [
            [dragItemIndex, 1],
            [hoverItemIndex, 0, dragCard],
          ],
        });

        return { ...prevSubCards, [currentCardId]: newSuBCards };
      });
    },
    [subCards]
  );

  const addCard = async () => {
    if (!plan) return;
    // @ts-ignore
    const { id, planCardName } = await createPlanCard(plan.id);

    setCards([...cards, { id, planCardName }]);
  };

  const removeCard = async (index: number, cardId: string) => {
    if (!plan) return;
    await deletePlanCard(cardId, index);

    const newCardsList = [...cards];

    newCardsList.splice(index, 1);
    setCards(newCardsList);
  };

  const handleDropCard = async (dropCardInfo: IDropCardInfo) => {
    if (!plan) return;

    await movePlanCardId(dropCardInfo);
  };

  const removeSubCard = (subCardIndex: number, cardId: string) => {
    const newCardsList = JSON.parse(JSON.stringify(subCards));

    newCardsList[cardId].splice(subCardIndex, 1);
    setSubCards(newCardsList);
  };

  return (
    <ColumnWrapper>
      <TitleColumn title={plan && plan.planName ? plan.planName : 'Plan Name'} titlePosition="left" />
      <Search />
      <Cards
        cards={cards}
        onMoveCard={handleMoveCard}
        removeCard={removeCard}
        onMoveSubCard={handleMoveSubCard}
        subCards={subCards}
        setSubCards={setSubCards}
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
