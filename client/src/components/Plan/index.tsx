// External
import React, { FC, useCallback, useState } from 'react';
import { Space } from 'antd';
import update from 'immutability-helper';
// Internal
import ColumnWrapper from 'components/Items/ColumnWrapper';
import Button from 'components/Items/Button';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { groupsSelector } from 'store/reducers/group/selectors';
import TitleColumn from '../Items/TitleColumn';
import Search from '../Search';
import Cards from './Cards';
// Styles
import { ICard, IItemInfo, IMoveSubCardDragInfo, ISubCards } from './interfaces';

export const cardsArray: ICard[] = [
  {
    id: '1',
  },
  {
    id: '2',
  },
  {
    id: '3',
  },
  {
    id: '4',
  },
];

const Plan: FC = () => {
  const [group] = useAppSelector(groupsSelector);
  const [cards, setCards] = useState<ICard[]>(cardsArray);
  const [subCards, setSubCards] = useState<ISubCards>({});

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

  const addCard = () => {
    setCards([...cards, { id: String(Date.now()) }]);
  };

  const removeCard = (index: number) => {
    const newCardsList = [...cards];
    newCardsList.splice(index, 1);
    setCards(newCardsList);
  };

  const removeSubCard = (subCardIndex: number, cardId: string) => {
    const newCardsList = JSON.parse(JSON.stringify(subCards));
    newCardsList[cardId].splice(subCardIndex, 1);
    setSubCards(newCardsList);
  };

  return (
    <ColumnWrapper>
      <TitleColumn title={group && group.planName ? group.planName : 'Plan Name'} titlePosition="left" />
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
      />
      <Space size="middle">
        <Button onClick={addCard} text="+ Add module" />
        <Button text="Save" />
      </Space>
    </ColumnWrapper>
  );
};

export default Plan;
