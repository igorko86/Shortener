// External
import { FC, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { CloseCircleFilled } from '@ant-design/icons';
import { Empty, Tabs } from 'antd';
// Internal
import { useAppSelector } from 'shared/hooks/storeHooks';
import {
  cardContentLoadingSelector,
  cardContentSelector,
  currentCardIdSelector,
} from 'store/reducers/library/selectors';
import ExerciseList from '../ExerciseList';
import Loader from 'components/Loader';
import { useActionCreator } from 'shared/hooks/useActionCreator';
// Styles

const { TabPane } = Tabs;

enum TabName {
  Explanation = 'Explanation',
  Exercises = 'Exercises',
}

const CardContent: FC = () => {
  const { getCardExercisesList, getCardExplanation, setCardContent, setActiveCardId } = useActionCreator();

  const { exercisesList, explanation, name, description } = useAppSelector(cardContentSelector);
  const activeCardId = useAppSelector(currentCardIdSelector);
  const loadingContent = useAppSelector(cardContentLoadingSelector);
  const [activeTab, setActiveTab] = useState(TabName.Explanation);

  const createMarkup = (html: string) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const resetStore = () => {
    setActiveCardId('');
    setCardContent({ name: '', description: '', exercisesList: [], explanation: '' });
  };

  const handleClose = () => {
    resetStore();
  };

  const handleActiveTab = async (key: string) => {
    if (loadingContent) return;

    if (key === TabName.Exercises && !exercisesList.length) {
      await getCardExercisesList();
    } else if (key === TabName.Explanation && !explanation) {
      await getCardExplanation();
    }
    setActiveTab(key as TabName);
  };

  useEffect(() => {
    setActiveTab(TabName.Explanation);
    setCardContent({ name: '', description: '', exercisesList: [], explanation: '' });

    getCardExplanation();
  }, [activeCardId]);

  useEffect(() => {
    return () => resetStore();
  }, []);

  return activeCardId ? (
    <div>
      <CloseCircleFilled onClick={handleClose} />
      {name && <div>{name}</div>}
      {description && <div>{description}</div>}
      <Tabs activeKey={activeTab} type="card" size="large" onChange={handleActiveTab}>
        <TabPane tab={TabName.Explanation} key={TabName.Explanation}>
          <div>
            <div dangerouslySetInnerHTML={createMarkup(explanation)} />
            {!loadingContent && !explanation && <Empty />}
            {loadingContent && <Loader position={'relative'} />}
          </div>
        </TabPane>
        <TabPane tab={TabName.Exercises} key={TabName.Exercises}>
          <ExerciseList exercisesList={exercisesList} />
          {loadingContent && <Loader position={'relative'} />}
        </TabPane>
      </Tabs>
    </div>
  ) : (
    <div>
      <div style={{ width: '100%' }}>Default CardContent</div>
    </div>
  );
};

export default CardContent;
