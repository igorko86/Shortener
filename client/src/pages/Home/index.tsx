// External
import { FC, useState } from 'react';
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
import { GridBlock } from './styles';

const Home: FC = () => {
  const [isTutorLibraryOpen, setIsTutorLibraryOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout.Content>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '260px' }}>
            <Plan />
          </div>
          <GridBlock isTutorOpen={isTutorLibraryOpen} isLibraryOpen={isLibraryOpen}>
            <Groups />
            <Students />
            <TutorLibrary setIsTutorLibraryOpen={setIsTutorLibraryOpen} />
            <Library setIsLibraryOpen={setIsLibraryOpen} />
            <CardContent />
          </GridBlock>
        </div>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout.Content>
    </DndProvider>
  );
};

export default Home;
