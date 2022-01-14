// External
import { FC, useEffect, useState } from 'react';
import { Modal, Select } from 'antd';
// Internal
import StudentService from 'shared/services/StudentService';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { userSelector } from 'store/reducers/auth/selectors';
import { planSelector, studentsSelector } from 'store/reducers/group/selectors';
import { useActionCreator } from 'shared/hooks/useActionCreator';

interface IProps {
  visible: boolean;
  onCancel: (showModal: boolean) => void;
}

const AddStudentModal: FC<IProps> = ({ visible, onCancel }) => {
  const tutor = useAppSelector(userSelector);
  const plan = useAppSelector(planSelector);
  const studentsInGroup = useAppSelector(studentsSelector);

  const { getStudentsInGroupByGroupId } = useActionCreator();

  const [creating, setCreating] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  const handleCancel = () => {
    onCancel(false);
    setValue([]);
  };

  const handleSubmit = async () => {
    setCreating(true);

    try {
      if (plan) {
        const { groupId } = plan;

        await StudentService.addStudent({ studentIds: value, groupId });

        getStudentsInGroupByGroupId(groupId);
      }

      handleCancel();
      setCreating(false);
    } catch {
      setCreating(false);
    }
  };

  const handleChange = (newValue: string[]) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (tutor && visible && plan) {
      StudentService.getStudentsById(tutor.id).then((studentsData) => {
        const students = studentsData.reduce((acc: { label: string; value: string }[], student) => {
          if (!studentsInGroup.some((stdInGroup) => stdInGroup.studentId === student.id)) {
            acc.push({ label: student.name, value: student.id });
          }

          return acc;
        }, []);

        setOptions(students);
      });
    }
  }, [visible]);

  return (
    <Modal
      title="Modal 1000px width and top 20px"
      style={{ top: 20 }}
      visible={visible}
      okText="Create"
      onOk={handleSubmit}
      onCancel={handleCancel}
      width={1000}
      okButtonProps={{ loading: creating }}
      cancelButtonProps={{ disabled: creating }}
      maskClosable={!creating}
      closable={!creating}
    >
      <Select
        mode="multiple"
        value={value}
        placeholder="Search to Select"
        optionFilterProp="children"
        onChange={handleChange}
        options={options}
        allowClear
        maxTagCount="responsive"
        showArrow
        style={{ width: '100%' }} // TODO add to styles
        // @ts-ignore
        filterOption={(input, option) => option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      />
    </Modal>
  );
};

export default AddStudentModal;
