import { FC } from 'react';
import { Form, Input, Tabs } from 'antd';

import Button from '../../../components/Button';
import { config, FormItem } from '../../../shared/formConfig';
import { EditOutlined } from '@ant-design/icons';

import { CreateCardDiv, InfoPanelDiv, PanelForm } from './styles';
import Explanation from './Explanation';

const { TabPane } = Tabs;

interface IProps {
  onClose: () => void;
}

const CreateCard: FC<IProps> = ({ onClose }) => {
  const [createCardForm] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('SUBMIT values', values);
    // if (showExerciseBlock) {
    //   confirm({ ...leaveCreateCardConfirm, onOk: () => submit(values) });
    // } else {
    //   submit(values);
    // }
  };

  const handleChange = (e: any) => {
    console.log(e);
    console.log(createCardForm);
    createCardForm.setFieldsValue({ ...createCardForm.getFieldsValue(), explanation: 'explanation' });
    console.log(createCardForm.getFieldsValue());
  };
  return (
    <CreateCardDiv>
      <PanelForm form={createCardForm} onFinish={handleSubmit} scrollToFirstError initialValues={{ htmlContent: '' }}>
        <Form.Item label={<EditOutlined />} {...config[FormItem.NAME]}>
          <Input placeholder="Card Name" />
        </Form.Item>
        <Form.Item label={<EditOutlined />} name="description">
          <Input placeholder="Description" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </PanelForm>
      <InfoPanelDiv>
        <Tabs type="card" defaultActiveKey="1" size="middle">
          <TabPane tab="Explanation" key="1">
            <Explanation onChange={handleChange} />
          </TabPane>
          <TabPane tab="Exercises" key="2">
            Content of tab 2
          </TabPane>
        </Tabs>
      </InfoPanelDiv>
    </CreateCardDiv>
  );
};

export default CreateCard;
