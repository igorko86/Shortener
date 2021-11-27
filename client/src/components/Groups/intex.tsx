// External
import { FC } from 'react';
import { Select } from 'antd';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { groupsSelector } from 'store/reducers/group/selectors';
import ColumnWrapper from '../Items/ColumnWrapper';

// Internal

const { Option } = Select;

// interface IProps {}

const Groups: FC = () => {
  const groups = useAppSelector(groupsSelector);

  const handleChangeGroups = (value: any) => {
    console.log(value);
  };

  return (
    <ColumnWrapper>
      <Select
        showSearch
        style={{ width: 300 }}
        placeholder="Select group"
        optionFilterProp="children"
        onChange={handleChangeGroups}
        filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {groups.map((group) => {
          // @ts-ignore
          const { groupName, planId } = group;

          return (
            <Option key={planId} value={planId}>
              {groupName}
            </Option>
          );
        })}
      </Select>
    </ColumnWrapper>
  );
};

export default Groups;
