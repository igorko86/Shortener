// External
import { FC, useState } from 'react';
import { Empty } from 'antd';
// Internal
import { useAppSelector } from 'shared/hooks/storeHooks';
import StudentService from 'shared/services/StudentService';
import Close from 'shared/assets/icons/close';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import AddStudent from 'components/Modals/AddStudent';
import { studentsSelector } from 'store/reducers/group/selectors';
import { IStudentInGroup } from 'store/reducers/group/types';
import Column from '../../../components/Items/Column';
import Button from '../../../components/Items/Button';
// Styles
import { SpanTitle } from '../../../components/Items/Card/styles';
import { ItemWrapper } from './styles';
import useCheckAccess from '../../../shared/hooks/useCheckAccess';
import { Role } from '../../../shared/models/request/authRequest';

const Students: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentStudents, setCurrentStudents] = useState<IStudentInGroup[] | null>(null);

  const students = useAppSelector(studentsSelector);

  const { setStudent } = useActionCreator();
  const show = useCheckAccess([Role.Admin, Role.Tutor]);

  const handleClickRemove = (id: string, index: number) => {
    students.splice(index, 1);
    setStudent([...students]);

    StudentService.deleteStudentsInGroupByIds([id]);
  };

  const handleClickAddStudent = () => {
    setShowModal(true);
  };

  const searchStudents = (value: string) => {
    if (value) {
      const filteredStudentsByValue = students.filter((student) => student.studentName.includes(value));

      setCurrentStudents(filteredStudentsByValue);
    } else {
      setCurrentStudents(null);
    }
  };

  const std = currentStudents || students;

  return (
    <>
      <Column
        title="Students"
        buttonText="+ Add student"
        onClickAdd={show ? handleClickAddStudent : undefined}
        cards={students}
        textItem="students"
        searchDataByValue={searchStudents}
      >
        {std.length ? (
          std.map((student, index: number) => {
            const { studentName, id } = student;

            return (
              <ItemWrapper key={id}>
                <SpanTitle>{studentName}</SpanTitle>
                {show && <Button onClick={() => handleClickRemove(id, index)} icon={<Close />} />}
              </ItemWrapper>
            );
          })
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Column>
      <AddStudent visible={showModal} onCancel={setShowModal} />
    </>
  );
};

export default Students;
