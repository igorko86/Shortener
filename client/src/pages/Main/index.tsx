import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DragNDrop from 'components/DragNDrop';

const Main: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <DragNDrop />
      </div>
      ;
    </DndProvider>
  );
};

export default Main;
