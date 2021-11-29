// External
import { ItemTypeCard, LibraryCardType } from 'components/Plan/interfaces';
import { FC } from 'react';
import { useDrag } from 'react-dnd';
// Internal
import Card from '../Items/Card/intex';

interface IProps {
  card: LibraryCardType;
  libraryCardIndex: number;
}

const LibraryCard: FC<IProps> = ({ card, libraryCardIndex }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypeCard.LIBRARY_CARD,
    item: { id: card.id, libraryCardIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return <Card isDragging={isDragging} drag={drag} card={card} />;
};

export default LibraryCard;
