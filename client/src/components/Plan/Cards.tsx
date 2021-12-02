// External
import { FC } from 'react';
import { List as ListAnt } from 'antd';
import withScrolling from 'react-dnd-scrolling';
// Internal
import PlanCard from 'components/PlanCard';
import { DivScrollZone } from './styles';
import { ICard, IItemInfo, IMoveSubCardDragInfo, ISubCards } from './interfaces';
// Styles

const ScrollZone = withScrolling(DivScrollZone);

interface IProps {
  cards: ICard[];
  onMoveSubCard: (arg: IMoveSubCardDragInfo) => void;
  onMoveCard: (dragIndex: number, hoverItemIndex: number) => void;
  subCards: ISubCards;
  setSubCards: (callBack: any) => void;
  canMoveDropSubCard: (itemInfo: IItemInfo) => boolean;
  removeCard: (index: number, cardId: string) => void;
  removeSubCard: (subCardIndex: number, cardId: string) => void;
}

const Cards: FC<IProps> = ({ cards, ...props }) => {
  return (
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
        {cards.map((card, index) => {
          const { id } = card;

          return (
            <ListAnt.Item key={id}>
              <PlanCard {...props} cardIndex={index} card={card} />
            </ListAnt.Item>
          );
        })}
      </ListAnt>
    </ScrollZone>
  );
};

export default Cards;
