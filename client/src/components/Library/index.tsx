// External
import { List } from 'antd';
// Internal
import LibraryCard from 'components/LibraryCard/intex';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { libraryCardsSelector } from 'store/reducers/library/selectors';
// styles
import { DivListArea } from './styles';

const Library = () => {
  const libraryCards = useAppSelector(libraryCardsSelector);
  return (
    <DivListArea>
      <h3>Library</h3>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 1,
          xxl: 1,
        }}
        dataSource={libraryCards}
      >
        {libraryCards.map(({ id }) => {
          return (
            <List.Item key={id}>
              <LibraryCard id={id} />
            </List.Item>
          );
        })}
      </List>
    </DivListArea>
  );
};

export default Library;
