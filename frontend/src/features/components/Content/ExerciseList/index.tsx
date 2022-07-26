import { FC, memo } from 'react';
import { Empty, List as ListAnt } from 'antd';

const { Item } = ListAnt;

interface IProps {
  exercisesList: any[];
  onShowExercise: () => void;
}

const ExerciseList: FC<IProps> = ({ exercisesList, onShowExercise }) => {
  const handleClick = (id: string) => {
    onShowExercise();
  };

  return exercisesList.length ? (
    <ListAnt
      itemLayout="horizontal"
      dataSource={exercisesList}
      renderItem={(item) => {
        console.log(item);
        const { id, name } = item;

        return (
          <Item>
            <Item.Meta title={<span onClick={() => handleClick(id)}>{name}</span>} />
          </Item>
        );
      }}
    />
  ) : (
    <Empty />
  );
};

export default memo(ExerciseList);
