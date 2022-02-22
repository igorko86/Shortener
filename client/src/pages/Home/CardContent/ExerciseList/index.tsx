// External
import { FC, memo } from 'react';
import { Empty, List as ListAnt } from 'antd';
// Internal
import { IExerciseInCardContent } from 'store/reducers/library/types';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { exerciseContentSelector } from 'store/reducers/library/selectors';
// Styles

const { Item } = ListAnt;

interface IProps {
  exercisesList: IExerciseInCardContent[];
  onShowExercise: () => void;
}

const ExerciseList: FC<IProps> = ({ exercisesList, onShowExercise }) => {
  const { getExerciseContent } = useActionCreator();
  const exerciseContent = useAppSelector(exerciseContentSelector);

  const handleClick = (id: string) => {
    if (exerciseContent?.id !== id) {
      getExerciseContent(id);
    }

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
