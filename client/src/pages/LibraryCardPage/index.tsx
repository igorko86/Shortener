// External
import { FC, useEffect, useState } from 'react';
import { Form, Input, Tabs } from 'antd';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
// Internal
import RouterPrompt from 'components/Items/RouterPrompt';
import { config, FormItem } from 'shared/helpers/formConfig';
import LibraryService from 'shared/services/LibraryService';
import { TabName } from './helper';
import ExplanationTab from './Explanation';
import ExercisesTab from './Exercises';
import { confirm, leaveCreateCardConfirm } from 'pages/LibraryCardPage/Confirm';
import Button from 'components/Items/Button';
import { ILibraryCardRequest } from 'shared/models/request/libraryRequest';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { exerciseIdsSelector } from 'store/reducers/library/selectors';

const { TabPane } = Tabs;

const LibraryCardPage: FC = () => {
  const [createCardForm] = Form.useForm();
  const newExerciseIds = useAppSelector(exerciseIdsSelector);
  const { setNewExerciseIds, setNewExercise } = useActionCreator();

  const [creatingNewCard, setCreatingNewCard] = useState(false);
  const [activeTab, setActiveTab] = useState<TabName>(TabName.Explanation);
  const [showExerciseBlock, setShowExerciseBlock] = useState(false);

  useEffect(() => {
    const { setFieldsValue, getFieldsValue } = createCardForm;

    if (newExerciseIds?.length) {
      setFieldsValue({ ...getFieldsValue(), exerciseIds: newExerciseIds });
    }
  }, [newExerciseIds]);

  const handleSubmit = (values: any) => {
    if (showExerciseBlock) {
      confirm({ ...leaveCreateCardConfirm, onOk: () => submit(values) });
    } else {
      submit(values);
    }
  };

  const resetState = () => {
    setNewExercise(null);
    setNewExerciseIds(null);
    setActiveTab(TabName.Explanation);
    setShowExerciseBlock(false);
    setCreatingNewCard(false);
    createCardForm.resetFields();
  };

  const submit = async (values: ILibraryCardRequest) => {
    try {
      setCreatingNewCard(true);

      await LibraryService.createLibraryCard(values);

      resetState();
    } catch {
      setCreatingNewCard(false);
    }
  };

  const toggleExerciseBlock = () => {
    setShowExerciseBlock(!showExerciseBlock);
  };

  const handleChangeTabs = (tabName: string) => {
    setActiveTab(tabName as string as TabName);
  };

  const handleOk = () => {
    setNewExercise(null);
    setNewExerciseIds(null);

    return Promise.resolve(true);
  };

  return (
    <Form form={createCardForm} onFinish={handleSubmit} scrollToFirstError initialValues={{ htmlContent: '' }}>
      <RouterPrompt
        getFieldsValue={createCardForm.getFieldsValue}
        title="Leave this page"
        cancelText="Cancel"
        okText="Confirm"
        onOK={handleOk}
      />
      <Form.Item {...config[FormItem.NAME]}>
        <Input />
      </Form.Item>
      <Form.Item {...config[FormItem.DESCRIPTION]}>
        <Input />
      </Form.Item>
      <Tabs activeKey={activeTab} onChange={handleChangeTabs}>
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
          <Form.Item name="exerciseIds">
            <ExercisesTab
              onClose={toggleExerciseBlock}
              showExerciseBlock={showExerciseBlock}
              creatingNewCard={creatingNewCard}
              activeTab={activeTab}
            />
          </Form.Item>
        </TabPane>
      </Tabs>
      {(activeTab === TabName.Explanation || !showExerciseBlock) && (
        <Form.Item>
          <Button text="Submit" type="primary" htmlType="submit" />
        </Form.Item>
      )}
    </Form>
  );
};

export default LibraryCardPage;
