// External
import { FC, useEffect, useState } from 'react';
import { Empty } from 'antd';
// Internal
import { groupsSelector, planSelector } from 'store/reducers/group/selectors';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { userSelector } from 'store/reducers/auth/selectors';
import { useAppSelector } from 'shared/hooks/storeHooks';
import Column from 'components/Items/Column';
import CreateCourseModal from 'components/Modals/CreateCourse';
import { Role } from 'shared/models/request/authRequest';
import useCheckAccess from 'shared/hooks/useCheckAccess';
// Styles
import { SpanTitle } from 'components/Items/Card/styles';
import { ItemWrapper } from 'pages/Home/Students/styles';

const Courses: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const groups = useAppSelector(groupsSelector);
  const plan = useAppSelector(planSelector);
  const user = useAppSelector(userSelector);

  const { getCourseData, getGroupsById } = useActionCreator();
  const show = useCheckAccess([Role.Admin, Role.Tutor]);

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

  const handleClickShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Column
        title="Courses"
        buttonText="+ Create new course"
        cards={groups}
        textItem="courses"
        searchDataByValue={searchGroups}
        onClickAdd={show ? handleClickShowModal : undefined}
      >
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
      <CreateCourseModal visible={showModal} onCancel={handleClickShowModal} />
    </>
  );
};

export default Courses;
