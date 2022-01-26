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
// Styles
import { DivPlan, GridBlock, DivWrapperLayout } from './styles';

const Home: FC = () => {
  const [isTutorLibraryOpen, setIsTutorLibraryOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout.Content>
        <DivWrapperLayout>
          <DivPlan>
            <Plan />
          </DivPlan>
          <GridBlock isTutorOpen={isTutorLibraryOpen} isLibraryOpen={isLibraryOpen}>
            <Groups />
            <Students />
            <TutorLibrary setIsTutorLibraryOpen={setIsTutorLibraryOpen} />
            <Library setIsLibraryOpen={setIsLibraryOpen} />
            <CardContent />
          </GridBlock>
        </DivWrapperLayout>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout.Content>
    </DndProvider>
  );
};

export default Home;
