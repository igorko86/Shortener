// External
import { useEffect } from 'react';
// Internal
import Plan from '../Plan';
import Courses from '../Courses';
import Students from '../Students';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { userSelector } from 'store/reducers/auth/selectors';
// Styles
import { DivGroup, DivPlan, DivStudents } from '../styles';

const StudentContent = () => {
  const user = useAppSelector(userSelector);

  const { getCoursesByStudentId } = useActionCreator();

  useEffect(() => {
    if (user) {
      getCoursesByStudentId(user.id);
    }
  }, []);

  return (
    <>
      <DivPlan>
        <Plan />
      </DivPlan>
      <DivGroup>
        <Courses />
      </DivGroup>
      <DivStudents>
        <Students />
      </DivStudents>
    </>
  );
};

export default StudentContent;
