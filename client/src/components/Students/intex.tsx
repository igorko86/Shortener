// External
import React, { FC } from 'react';
import { List, Space } from 'antd';
// Internal
import { useAppDispatch, useAppSelector } from 'shared/hooks/storeHooks';
import StudentService from 'shared/services/StudentService';
import { groupActions } from 'store/reducers/group/actionCreators';
import { studentsSelector } from 'store/reducers/group/selectors';
import ColumnWrapper from '../Items/ColumnWrapper';
import TitleColumn from '../Items/TitleColumn';
import Button from '../Items/Button';
import Search from '../Search';
// Styles
import { DivCard, SpanTitle } from '../Items/Card/styles';
import Close from 'shared/assets/icons/close';
import { StudentListWrapper } from './styles';

const { setStudent } = groupActions;

const Students: FC = () => {
  const students = useAppSelector(studentsSelector);
  const dispatch = useAppDispatch();

  const handleClickRemove = (id: string, index: number) => {
    students.splice(index, 1);
    dispatch(setStudent([...students]));

    StudentService.deleteStudents([id]);
  };

  return (
    <ColumnWrapper>
      <TitleColumn planName="Students" />
      <Search />
      <StudentListWrapper
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 1,
          xxl: 1,
        }}
        dataSource={students}
      >
        {students.map((student, index) => {
          const { name, id } = student;

          return (
            <List.Item key={id}>
              <DivCard key={id}>
                <SpanTitle>{name}</SpanTitle>
                <Button onClick={() => handleClickRemove(id, index)} data-name="remove" icon={<Close />} />
              </DivCard>
            </List.Item>
          );
        })}
      </StudentListWrapper>
      <Space size="middle">
        <Button onClick={() => console.log('hellooo')} text="+ Add student" />
      </Space>
    </ColumnWrapper>
  );
};

export default Students;
