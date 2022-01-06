// External
import { FC, useEffect, useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!plan && user) {
      getGroupsById(user.id);
    }
  }, []);

  const handleChangeGroup = (groupId: any) => {
    getCourseData(groupId);
  };

  return (
    <Column
      title="Groups"
      buttonText="+ Add group"
      onClickAdd={() => console.log('hellooo')}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cards={groups}
      textItem="groups"
    >
      {groups.map((group: any) => {
        const { id, groupName } = group;

        return (
          <ItemWrapper key={id} onClick={() => handleChangeGroup(id)}>
            <SpanTitle>{groupName}</SpanTitle>
          </ItemWrapper>
        );
      })}
    </Column>
  );
};

export default Groups;
