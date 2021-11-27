// External
import { FC, useEffect, useState } from 'react';
import { Select } from 'antd';
// Internal
import { useAppSelector } from 'shared/hooks/storeHooks';
import { groupsSelector } from 'store/reducers/group/selectors';
import { useActionCreator } from 'shared/hooks/useActionCreator';

const { Option } = Select;

// interface IProps {}

const Groups: FC = () => {
  const groups = useAppSelector(groupsSelector);
  const { getPlan } = useActionCreator();
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (groups.length && groups[0]?.planName) {
      setSelectedValue(groups[0].planId);
    }
  }, [groups]);

  const handleChangeGroup = (value: any) => {
    console.log(value);
    getPlan(value);
    setSelectedValue(value);
  };

  return (
    <div>
      <Select
        showSearch
        style={{ width: 300 }}
        value={selectedValue}
        placeholder="Select group"
        optionFilterProp="children"
        onChange={handleChangeGroup}
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
    </div>
  );
};

export default Groups;
