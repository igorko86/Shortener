// External
import { FC, useCallback, useState } from 'react';
import { List as ListAnt } from 'antd';
import update from 'immutability-helper';
// Internal
import Card from 'components/Card';
// Styles
import { DivListArea } from './styles';

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
  cardId: string;
}

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

  return (
    <DivListArea>
      <h3>Plan</h3>
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
              <Card
                cardId={id}
                cardIndex={index}
                onMoveCard={handleMoveCard}
                onMoveSubCard={handleMoveSubCard}
                subCards={subCards}
                setSubCards={setSubCards}
                canMoveDropSubCard={canMoveDropSubCard}
              />
            </ListAnt.Item>
          );
        })}
      </ListAnt>
    </DivListArea>
  );
};

export default Plan;
