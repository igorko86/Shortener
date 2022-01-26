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
import Column from '../Items/Column';
import Button from '../Items/Button';
// Styles
import { SpanTitle } from '../Items/Card/styles';
import { ItemWrapper } from './styles';

const Students: FC = () => {
  const students = useAppSelector(studentsSelector);
  const { setStudent } = useActionCreator();
  const [showModal, setShowModal] = useState(false);
  const [currentStudents, setCurrentStudents] = useState<IStudentInGroup[] | null>(null);

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
        onClickAdd={handleClickAddStudent}
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
                <Button onClick={() => handleClickRemove(id, index)} icon={<Close />} />
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
