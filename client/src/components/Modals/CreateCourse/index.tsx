// External
import { FC, useEffect, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
// Internal
import { config, FormItem } from 'shared/helpers/formConfig';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { userSelector } from 'store/reducers/auth/selectors';
import StudentService from 'shared/services/StudentService';

interface IProps {
  visible: boolean;
  onCancel: (showModal: boolean) => void;
}

const CreateCourseModal: FC<IProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const [creating, setCreating] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  const tutor = useAppSelector(userSelector);

  const { createCourse } = useActionCreator();

  const handleCancel = () => {
    form.resetFields();
    onCancel(false);
  };

  const handleSubmit = async () => {
    setCreating(true);

    try {
      const validFields = await form.validateFields();
      console.log(validFields);
      if (tutor) {
        createCourse({ ...validFields, tutorId: tutor.id });
      }

      handleCancel();
      setCreating(false);
    } catch {
      setCreating(false);
      console.log('Validate Failed');
    }
  };

  useEffect(() => {
    if (tutor && visible) {
      StudentService.getStudentsById(tutor.id).then((studentsData) => {
        const students = studentsData.map(({ name, id }) => ({ value: id, label: name }));

        setOptions(students);
      });
    }
  }, [visible]);

  const handleChange = (newValue: string[]) => {
    setValue(newValue);
    form.setFieldsValue({ studentIds: newValue });
  };

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
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item {...config[FormItem.PLAN_NAME]} disabled>
          <Input disabled={creating} />
        </Form.Item>
        <Form.Item {...config[FormItem.GROUP_NAME]}>
          <Input disabled={creating} />
        </Form.Item>
        <Form.Item name="studentIds" label="Students">
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
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCourseModal;
