// External
import { FC, useState } from 'react';
// Internal
import { useAppDispatch, useAppSelector } from 'shared/hooks/storeHooks';
import { groupActions } from 'store/reducers/group/actionCreators';
import { studentsSelector } from 'store/reducers/group/selectors';
import StudentService from 'shared/services/StudentService';
import Close from '../../shared/assets/icons/close';
import Column from '../Items/Column';
import Button from '../Items/Button';
// Styles
import { ItemWrapper } from './styles';
import { SpanTitle } from '../Items/Card/styles';

const { setStudent } = groupActions;

const Students: FC = () => {
  const students = useAppSelector(studentsSelector);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickRemove = (id: string, index: number) => {
    students.splice(index, 1);
    dispatch(setStudent([...students]));

    StudentService.deleteStudentsInGroupByIds([id]);
  };

  return (
    <Column
      title="Students"
      buttonText="+ Add student"
      onClickAdd={() => console.log('hellooo')}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cards={students}
      textItem="students"
    >
      {students.map((student: any, index: number) => {
        const { studentName, id } = student;

        return (
          <ItemWrapper key={id}>
            <SpanTitle>{studentName}</SpanTitle>
            <Button onClick={() => handleClickRemove(id, index)} icon={<Close />} />
          </ItemWrapper>
        );
      })}
    </Column>
  );
};

export default Students;
