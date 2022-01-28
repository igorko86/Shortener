// External
import { FC, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Layout } from 'antd';
// Internal
import Plan from 'components/Plan';
import Library from 'pages/Home/Library';
import CardContent from 'pages/Home/CardContent';
import Groups from 'pages/Home/Courses';
import TutorLibrary from 'pages/Home/TutorLibrary';
import Students from 'pages/Home/Students';
// Styles
import { DivPlan, DivWrapperLayout, GridBlock } from './styles';
import useCheckAccess from '../../shared/hooks/useCheckAccess';
import { Role } from '../../shared/models/request/authRequest';

const Home: FC = () => {
  const [isTutorLibraryOpen, setIsTutorLibraryOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const showLibrary = useCheckAccess([Role.Admin, Role.Tutor]);
  const showPlanCoursesStudents = useCheckAccess([Role.Admin, Role.Tutor, Role.Student]);
  const show = useCheckAccess([Role.Admin, Role.Tutor]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout.Content>
        <DivWrapperLayout>
          <DivPlan>{showPlanCoursesStudents && <Plan />}</DivPlan>
          <GridBlock isTutorOpen={isTutorLibraryOpen} isLibraryOpen={isLibraryOpen}>
            {showPlanCoursesStudents && (
              <>
                <Groups />
                <Students />
              </>
            )}
            {showLibrary && <TutorLibrary setIsTutorLibraryOpen={setIsTutorLibraryOpen} />}
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
