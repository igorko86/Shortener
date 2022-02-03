// External
import { FC, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Layout } from 'antd';
// Internal
import Library from 'pages/Home/Library';
import CardContent from 'pages/Home/CardContent';
import { Role } from 'shared/models/request/authRequest';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { userSelector } from 'store/reducers/auth/selectors';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import StudentContent from './StudentContent';
import TutorContent from './TutorContent';
// Styles
import { DivContent, DivLib, DivWrapperLayout, GridBlock } from './styles';

const Home: FC = () => {
  const [isTutorLibraryOpen, setIsTutorLibraryOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const user = useAppSelector(userSelector);

  const { getLibraryCards, setActiveCardId, setPlan, setStudent } = useActionCreator();

  const showTutorLibrary = [Role.Admin, Role.Tutor].includes(user?.role as Role);
  const showPlanCoursesStudents = [Role.Admin, Role.Tutor, Role.Student].includes(user?.role as Role);

  useEffect(() => {
    getLibraryCards();
    setActiveCardId('');
    setPlan(null);
    setStudent([]);
  }, [user?.role]);

  const getContentComponentByRole = () => {
    switch (user?.role) {
      case Role.Student:
        return <StudentContent />;
      case Role.Tutor:
        return <TutorContent setIsTutorLibraryOpen={setIsTutorLibraryOpen} />;
      default:
        return null;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout.Content>
        <DivWrapperLayout>
          <GridBlock
            isTutorOpen={isTutorLibraryOpen}
            isLibraryOpen={isLibraryOpen}
            showTutorLibrary={showTutorLibrary}
            showPlanCoursesStudents={showPlanCoursesStudents}
          >
            {getContentComponentByRole()}
            <DivLib showPlanCoursesStudents={showPlanCoursesStudents}>
              <Library setIsLibraryOpen={setIsLibraryOpen} />
            </DivLib>
            <DivContent>
              <CardContent />
            </DivContent>
          </GridBlock>
        </DivWrapperLayout>
      </Layout.Content>
    </DndProvider>
  );
};

export default Home;
