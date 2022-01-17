// External
import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Layout } from 'antd';
// Internal
import Plan from 'components/Plan';
import Library from 'components/Library';
import CardContent from 'pages/Home/CardContent';
import Groups from 'components/Groups';
import TutorLibrary from 'components/TutorLibrary';
import Students from 'components/Students';

const Home: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout.Content>
        <div style={{ display: 'flex' }}>
          <Plan />
          <CardContent />
          <Groups />
          <Students />
          <TutorLibrary />
          <Library />
        </div>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout.Content>
    </DndProvider>
  );
};

export default Home;
