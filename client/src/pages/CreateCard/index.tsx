// External
import { FC } from 'react';
import { Button, Form, Input } from 'antd';
// Internal
import Editor from 'components/Editor';
import LibraryService from 'shared/services/LibraryService';

const CreateCard: FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    LibraryService.createLibraryCard(values).then((r) => console.log(r));

    // form.resetFields();
  };

  return (
    <div>
      <Form form={form} onFinish={handleSubmit} scrollToFirstError>
        <Form.Item name="title" label="Card name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="htmlContent" label="Create card">
          <Editor />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCard;
