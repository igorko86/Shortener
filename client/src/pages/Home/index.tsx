// External
import { FC, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Layout } from 'antd';
// Internal
import Plan from 'pages/Home/Plan';
import Library from 'pages/Home/Library';
import CardContent from 'pages/Home/CardContent';
import Courses from 'pages/Home/Courses';
import TutorLibrary from 'pages/Home/TutorLibrary';
import Students from 'pages/Home/Students';
import useCheckAccess from 'shared/hooks/useCheckAccess';
import { Role } from 'shared/models/request/authRequest';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { userSelector } from 'store/reducers/auth/selectors';
import { useActionCreator } from 'shared/hooks/useActionCreator';
// Styles
import { DivPlan, DivWrapperLayout, GridBlock } from './styles';

const Home: FC = () => {
  const [isTutorLibraryOpen, setIsTutorLibraryOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const user = useAppSelector(userSelector);

  const {
    getLibraryCards,
    getCoursesByStudentId,
    getMyLibraryCards,
    getCoursesByTutorId,
    setActiveCardId,
    setPlan,
    setStudent,
  } = useActionCreator();

  const showTutorLibrary = [Role.Admin, Role.Tutor].includes(user?.role as Role);
  const showPlanCoursesStudents = [Role.Admin, Role.Tutor, Role.Student].includes(user?.role as Role);

  useEffect(() => {
    switch (user?.role) {
      case Role.Student:
        getCoursesByStudentId(user.id);
        break;
      case Role.Tutor:
        getMyLibraryCards();
        getCoursesByTutorId(user.id);
        break;
    }

    getLibraryCards();
    setActiveCardId('');
    setPlan(null);
    setStudent([]);
  }, [user?.role]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout.Content>
        <DivWrapperLayout>
          <GridBlock isTutorOpen={isTutorLibraryOpen} isLibraryOpen={isLibraryOpen}>
            {showPlanCoursesStudents && (
              <>
                <DivPlan>
                  <Plan />
                </DivPlan>
                <Courses />
                <Students />
              </>
            )}
            {showTutorLibrary && <TutorLibrary setIsTutorLibraryOpen={setIsTutorLibraryOpen} />}
            <Library setIsLibraryOpen={setIsLibraryOpen} />
            <CardContent />
          </GridBlock>
        </DivWrapperLayout>
      </Layout.Content>
    </DndProvider>
  );
};

export default Home;
