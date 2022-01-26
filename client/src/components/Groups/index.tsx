// External
import { FC, useEffect } from 'react';
import { Empty } from 'antd';
// Internal
import { groupsSelector, planSelector } from 'store/reducers/group/selectors';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { userSelector } from 'store/reducers/auth/selectors';
import { useAppSelector } from 'shared/hooks/storeHooks';
import Column from '../Items/Column';
// Styles
import { SpanTitle } from '../Items/Card/styles';
import { ItemWrapper } from 'components/Students/styles';

const Groups: FC = () => {
  const groups = useAppSelector(groupsSelector);
  const plan = useAppSelector(planSelector);
  const user = useAppSelector(userSelector);
  const { getCourseData, getGroupsById } = useActionCreator();

  useEffect(() => {
    if (!plan && user) {
      getGroupsById(user.id);
    }
  }, []);

  const handleChangeGroup = (groupId: string) => {
    if (plan?.groupId !== groupId) {
      getCourseData(groupId);
    }
  };

  const searchGroups = (value: string) => {
    if (user) {
      getGroupsById(user.id, value);
    }
  };

  return (
    <Column title="Groups" buttonText="+ Add group" cards={groups} textItem="groups" searchDataByValue={searchGroups}>
      {groups.length ? (
        groups.map((group: any) => {
          const { id, groupName } = group;

          return (
            <ItemWrapper key={id} onClick={() => handleChangeGroup(id)}>
              <SpanTitle>{groupName}</SpanTitle>
            </ItemWrapper>
          );
        })
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Column>
  );
};

export default Groups;
