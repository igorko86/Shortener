// External
import { FC } from 'react';
import { List as ListAnt } from 'antd';
// Internal
import { useAppSelector } from 'shared/hooks/storeHooks';
import { exercisesSelector } from 'store/reducers/library/selectors';

const { Item } = ListAnt;

const List: FC = () => {
  const newExercises = useAppSelector(exercisesSelector);

  return (
    <ListAnt
      itemLayout="horizontal"
      dataSource={newExercises}
      renderItem={(item) => (
        <Item>
          <Item.Meta title={<a href="https://ant.design">{item.name}</a>} />
        </Item>
      )}
    />
  );
};

export default List;
