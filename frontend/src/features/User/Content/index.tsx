import { FC } from 'react';

import { Empty, Tabs } from 'antd';

import { ContentSection } from './styles';

const { TabPane } = Tabs;

enum TabName {
  Explanation = 'Explanation',
  Exercises = 'Exercises',
}

const Content: FC = () => {
  return (
    <ContentSection>
      {/* <CloseCircleFilled onClick={handleClose} />*/}
      {/* {name && <div>{name}</div>}*/}
      {/* {description && <div>{description}</div>}*/}
      {/* <Tabs activeKey={activeTab} type="card" size="large" onChange={handleActiveTab}>*/}
      {/*  <TabPane tab={TabName.Explanation} key={TabName.Explanation}>*/}
      {/*    <div>*/}
      {/*      <div dangerouslySetInnerHTML={createMarkup(explanation)} />*/}
      {/*      {!loadingContent && !explanation && <Empty />}*/}
      {/*      {loadingContent && <Loader position={'relative'} />}*/}
      {/*    </div>*/}
      {/*  </TabPane>*/}
      {/*  <TabPane tab={TabName.Exercises} key={TabName.Exercises}>*/}
      {/*    <ExercisesContent />*/}
      {/*    {loadingContent && <Loader position={'relative'} />}*/}
      {/*  </TabPane>*/}
      {/* </Tabs>*/}
      Content
    </ContentSection>
  );
};

export default Content;
