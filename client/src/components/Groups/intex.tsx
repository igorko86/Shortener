// External
import React, { FC, useEffect, useState } from 'react';
import { Select } from 'antd';
// Internal
import { useAppSelector } from 'shared/hooks/storeHooks';
import { groupsSelector, planSelector } from 'store/reducers/group/selectors';
import { userSelector } from 'store/reducers/auth/selectors';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import ColumnWrapper from '../Items/ColumnWrapper';
import TitleColumn from '../Items/TitleColumn';

// Internal

const { Option } = Select;

// interface IProps {}

const Groups: FC = () => {
  const groups = useAppSelector(groupsSelector);
  const plan = useAppSelector(planSelector);
  const user = useAppSelector(userSelector);
  const { getCourseData, getGroupsById } = useActionCreator();
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (groups.length && plan) {
      setSelectedValue(plan.groupId);
    }
  }, [groups]);

  useEffect(() => {
    if (!plan && user) {
      getGroupsById(user.id);
    }
  }, []);

  const handleChangeGroup = (groupId: any) => {
    getCourseData(groupId);
    setSelectedValue(groupId);
  };

  return (
    <ColumnWrapper>
      <TitleColumn planName="Groups" />
      <Select
        showSearch
        value={selectedValue}
        placeholder="Select group"
        optionFilterProp="children"
        onChange={handleChangeGroup}
        // @ts-ignore
        filterOption={(input, option) => option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {groups.map((group) => {
          const { groupName, id } = group;

          return (
            <Option key={id} value={id}>
              {groupName}
            </Option>
          );
        })}
      </Select>
    </ColumnWrapper>
  );
};

export default Groups;
