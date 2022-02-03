// External
import { FC, useEffect } from 'react';
// Internal
import AppSubHeader from 'components/AppSubHeader';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { userSelector } from 'store/reducers/auth/selectors';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import Plan from '../Plan';
import Courses from '../Courses';
import Students from '../Students';
import TutorLibrary from '../TutorLibrary';
// Styles
import { DivGroup, DivPlan, DivStudents } from '../styles';

interface IProps {
  setIsTutorLibraryOpen: (val: boolean) => void;
}

const TutorContent: FC<IProps> = ({ setIsTutorLibraryOpen }) => {
  const user = useAppSelector(userSelector);
  const { getMyLibraryCards, getCoursesByTutorId } = useActionCreator();

  useEffect(() => {
    if (user) {
      getMyLibraryCards();
      getCoursesByTutorId(user.id);
    }
  }, []);

  return (
    <>
      <AppSubHeader />
      <DivPlan>
        <Plan />
      </DivPlan>
      <DivGroup>
        <Courses />
      </DivGroup>
      <DivStudents>
        <Students />
      </DivStudents>
      <TutorLibrary setIsTutorLibraryOpen={setIsTutorLibraryOpen} />
    </>
  );
};

export default TutorContent;
