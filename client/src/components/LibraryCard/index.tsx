// External
import { FC } from 'react';
import { useDrag } from 'react-dnd';
// Internal
import { ItemTypeCard, LibraryCardType } from 'components/Plan/interfaces';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import Card from '../Items/Card';

interface IProps {
  card: LibraryCardType;
  libraryCardIndex: number;
}

const LibraryCard: FC<IProps> = ({ card, libraryCardIndex }) => {
  const { getCardContent } = useActionCreator();
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypeCard.LIBRARY_CARD,
    item: { id: card.id, libraryCardIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleShowContent = () => {
    getCardContent(card.id);
  };

  return <Card isDragging={isDragging} drag={drag} card={card} isDescription onShowContent={handleShowContent} />;
};

export default LibraryCard;
