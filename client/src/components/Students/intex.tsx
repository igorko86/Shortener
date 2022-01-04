// External
import React, { FC, useEffect, useState } from 'react';
import { Select } from 'antd';
// Internal
import { useAppSelector } from 'shared/hooks/storeHooks';
import { planSelector, studentsSelector } from 'store/reducers/group/selectors';
import ColumnWrapper from '../Items/ColumnWrapper';
import TitleColumn from '../Items/TitleColumn';
import Button from '../Items/Button';
import { StudentSelect } from './styles';

// Internal

const { Option } = Select;

// interface IProps {}

const Students: FC = () => {
  const students = useAppSelector(studentsSelector);
  const plan = useAppSelector(planSelector);

  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (students.length && plan) {
      setSelectedValue('');
    }
  }, [students]);

  const handleChangeGroup = (studentId: any) => {
    setSelectedValue(studentId);
  };

  return (
    <ColumnWrapper>
      <TitleColumn planName="Students" />
      <StudentSelect
        showSearch
        value={selectedValue}
        placeholder="Select student"
        optionFilterProp="children"
        onChange={handleChangeGroup}
        // @ts-ignore
        filterOption={(input, option) => option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {students.map((student) => {
          const { name, id } = student;

          return (
            <Option key={id} value={id}>
              {name}
            </Option>
          );
        })}
      </StudentSelect>
      <Button onClick={() => console.log('hellooo')} text="+ Add student" />
    </ColumnWrapper>
  );
};

export default Students;
