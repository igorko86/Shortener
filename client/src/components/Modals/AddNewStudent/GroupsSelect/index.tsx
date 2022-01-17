// External
import { FC, useState } from 'react';
import { Select } from 'antd';
// Internal
import { useAppSelector } from 'shared/hooks/storeHooks';
import { groupsSelector } from 'store/reducers/group/selectors';

const { Option } = Select;

interface IProps {
  changeFormValue: (value: string) => void;
  disabled: boolean;
}

const GroupsSelect: FC<IProps> = ({ changeFormValue, disabled }) => {
  const groups = useAppSelector(groupsSelector);
  const [selectedValue, setSelectedValue] = useState<string>();

  const handleChange = (id: string) => {
    setSelectedValue(id);
    changeFormValue(id);
  };

  return (
    <Select
      disabled={disabled}
      showSearch
      value={selectedValue}
      placeholder="Search to Select"
      optionFilterProp="children"
      onChange={handleChange}
      allowClear
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
  );
};

export default GroupsSelect;
