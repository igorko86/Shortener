// External
import { FC } from 'react';
import { Card } from 'antd';
import { useDrag } from 'react-dnd';
// Internal
import { ILibraryCard } from 'store/reducers/library/types';
import { ItemTypeCard } from '../Plan';

interface IProps {
  card: ILibraryCard;
}

const LibraryCard: FC<IProps> = ({ card }) => {
  const { id, title, description } = card;

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypeCard.LIBRARY_CARD,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <Card title={title}>
        <p>{id}</p>
        <p>{description}</p>
      </Card>
    </div>
  );
};

export default LibraryCard;
