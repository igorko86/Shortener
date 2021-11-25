// External
import { FC, useState } from 'react';
import { Button, Form, Input } from 'antd';
// Internal
import LibraryService from 'shared/services/LibraryService';
import { config, FormItem } from 'shared/helpers/formConfig';

const EditorForm: FC = ({ children }) => {
  const [creatingNewCard, setCreatingNewCard] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    setCreatingNewCard(true);
    LibraryService.createLibraryCard(values).finally(() => {
      setCreatingNewCard(false);
    });

    // form.resetFields(); // TODO uncomment it
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={handleSubmit}
        scrollToFirstError
        initialValues={{
          htmlContent: '',
        }}
      >
        <Form.Item {...config[FormItem.TITLE]}>
          <Input />
        </Form.Item>
        <Form.Item {...config[FormItem.DESCRIPTION]}>
          <Input />
        </Form.Item>
        <Form.Item name="htmlContent" label="Create card">
          {children}
        </Form.Item>
        <Form.Item>
          <Button loading={creatingNewCard} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditorForm;
