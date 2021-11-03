import React, { FC, useState } from 'react';
import { useDrop } from 'react-dnd';

import Card from '../Card/intex';

const mockList = [
  {
    id: 1,
    title: 'Modals',
  },
  {
    id: 2,
    title: 'Past tenses',
  },
];
const styleBlockCard = { width: '70%', display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-end' };
const styleBlockCard1 = {
  width: '300px',
  height: '600px',
  border: '1px solid red',
  display: 'flex',
  flexDirection: 'column' as const,
};

const DragNDrop: FC = () => {
  const [list, setList] = useState<any>([]);
  const [, drop] = useDrop(() => ({
    accept: 'Card',
    // @ts-ignore
    drop: (item) => setList((l: any) => [...l, item.item]),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div>
      <div style={styleBlockCard}>
        {mockList.map((item) => {
          const { id, title } = item;

          return (
            <div key={id}>
              <Card title={title} item={item} />
            </div>
          );
        })}
      </div>
      <div ref={drop} style={styleBlockCard1}>
        {list.map((item: any) => {
          const { id, title } = item;
          console.log(item);
          return (
            <div key={id}>
              <Card title={title} item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DragNDrop;
