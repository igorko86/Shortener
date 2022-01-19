// External
import { FC, memo } from 'react';
import { Empty, List as ListAnt } from 'antd';
// Internal
import { IExercise } from 'store/reducers/library/types';

// Styles

const { Item } = ListAnt;

interface IProps {
  exercisesList: IExercise[];
}

const ExerciseList: FC<IProps> = ({ exercisesList }) => {
  return exercisesList.length ? (
    <ListAnt
      itemLayout="horizontal"
      dataSource={exercisesList}
      renderItem={(item) => (
        <Item>
          <Item.Meta title={<a href="https://ant.design">{item.name}</a>} />
        </Item>
      )}
    />
  ) : (
    <Empty />
  );
};

export default memo(ExerciseList);
