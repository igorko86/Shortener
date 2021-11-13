// External
import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Layout } from 'antd';
// Internal
import Plan from 'components/Plan';
import Library from 'components/Library';

const Main: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout.Content>
        <div style={{ display: 'flex', width: '800px' }}>
          <Plan />
          <Library />
        </div>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout.Content>
    </DndProvider>
  );
};

export default Main;
