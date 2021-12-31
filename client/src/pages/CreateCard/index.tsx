// External
import { FC, useState } from 'react';
import { Button, Form, Input, Tabs } from 'antd';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
// Internal
import RouterPrompt from 'components/Items/RouterPrompt';
import { config, FormItem } from 'shared/helpers/formConfig';
import LibraryService from 'shared/services/LibraryService';
import { TabName } from './helper';
import ExplanationTab from './Explanation';
import ExercisesTab from './Exercises';
import { confirm } from 'components/Items/Confirm';

const { TabPane } = Tabs;

const CreateCard: FC = () => {
  const [createCardForm] = Form.useForm();

  const [creatingNewCard, setCreatingNewCard] = useState(false);
  const [activeTab, setActiveTab] = useState(TabName.Explanation);
  const [showExerciseBlock, setShowExerciseBlock] = useState(false);

  const handleSubmit = (values: any) => {
    if (showExerciseBlock) {
      confirm({ onOk: () => submit(values) });
    } else {
      submit(values);
    }
  };

  const resetState = () => {
    setActiveTab(TabName.Explanation);
    setShowExerciseBlock(false);
  };

  const submit = (values: any) => {
    setCreatingNewCard(true);

    LibraryService.createLibraryCard(values).finally(() => {
      setCreatingNewCard(false);
      resetState();
      createCardForm.resetFields();
    });
  };

  const toggleExerciseBlock = () => {
    setShowExerciseBlock(!showExerciseBlock);
  };

  const handleChangeTabs = (tabName: string) => {
    setActiveTab(tabName as string as TabName);
  };

  return (
    <Form form={createCardForm} onFinish={handleSubmit} scrollToFirstError initialValues={{ htmlContent: '' }}>
      <RouterPrompt
        getFieldsValue={createCardForm.getFieldsValue}
        title="Leave this page"
        cancelText="Cancel"
        okText="Confirm"
        onOK={() => Promise.resolve(true)}
      />
      <Form.Item {...config[FormItem.NAME]}>
        <Input />
      </Form.Item>
      <Form.Item {...config[FormItem.DESCRIPTION]}>
        <Input />
      </Form.Item>
      <Tabs defaultActiveKey={TabName.Explanation} onChange={handleChangeTabs}>
        <TabPane
          tab={
            <span>
              <AppleOutlined />
              {TabName.Explanation}
            </span>
          }
          key={TabName.Explanation}
        >
          <Form.Item name="htmlContent">
            <ExplanationTab />
          </Form.Item>
        </TabPane>
        <TabPane
          disabled={false}
          tab={
            <span>
              <AndroidOutlined />
              {TabName.Exercises}
            </span>
          }
          key={TabName.Exercises}
        >
          <ExercisesTab onClose={toggleExerciseBlock} showExerciseBlock={showExerciseBlock} />
        </TabPane>
      </Tabs>
      {(activeTab === TabName.Explanation || !showExerciseBlock) && (
        <Form.Item>
          <Button loading={creatingNewCard} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default CreateCard;
