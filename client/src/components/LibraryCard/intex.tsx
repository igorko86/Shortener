// External
import { FC } from 'react';
import { Card } from 'antd';
import { useDrag } from 'react-dnd';
// Internal
import { ItemTypeCard } from '../Plan';

interface IProps {
  id: string;
}

const LibraryCard: FC<IProps> = ({ id }) => {
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
      <Card title={`Type: ${ItemTypeCard.LIBRARY_CARD}`}>
        <p>Card content {id}</p>
      </Card>
    </div>
  );
};

export default LibraryCard;
