// External
import React, { FC, useCallback, useState } from 'react';
import { List as ListAnt, Space } from 'antd';
import update from 'immutability-helper';
import withScrolling from 'react-dnd-scrolling';
// Internal
import PlanCard from 'components/PlanCard';
import ColumnWrapper from 'components/Items/ColumnWrapper';
import Button from 'components/Items/Button';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { groupsSelector } from 'store/reducers/group/selectors';
import TitleColumn from '../Items/TitleColumn';
import Search from '../Search';
// Styles

const ScrollZone = withScrolling(DivScrollZone);

export enum ItemTypeCard {
  CARD = 'Card',
  SUB_CARD = 'SubCard',
  LIBRARY_CARD = 'LibraryCard',
}

export interface IMoveSubCardDragInfo {
  currentCardId: string;
  dragItemIndex: number;
  hoverItemIndex: number;
  subCardId: string;
  dragCardId: string;
}

export interface ICard {
  id: string;
}

export interface ISubCard {
  id: string;
  cardId?: string;
  description: string;
  title: string;
}

export type LibraryCardType = Omit<ISubCard, 'cardId'>;

export interface ISubCards {
  [key: string]: ISubCard[];
}

export interface IItemInfo {
  dragSubCardId: string;
  cardId: string;
  dragCardId: string;
}

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
      {/* <Popover /> */}
      <Search />
      <ScrollZone>
        <ListAnt
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 1,
            xxl: 1,
          }}
          dataSource={cards}
        >
          {cards.map(({ id }, index) => {
            return (
              <ListAnt.Item key={id}>
                <PlanCard
                  cardId={id}
                  cardIndex={index}
                  onMoveCard={handleMoveCard}
                  removeCard={removeCard}
                  onMoveSubCard={handleMoveSubCard}
                  subCards={subCards}
                  setSubCards={setSubCards}
                  canMoveDropSubCard={canMoveDropSubCard}
                  removeSubCard={removeSubCard}
                />
              </ListAnt.Item>
            );
          })}
        </ListAnt>
      </ScrollZone>
      <Space size="middle">
        <Button onClick={addCard} text="+ Add module" />
        <Button text="Save" />
      </Space>
    </ColumnWrapper>
  );
};

export default Plan;
