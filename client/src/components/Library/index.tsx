// External
import { useEffect } from 'react';
import { List } from 'antd';
// Internal
import LibraryCard from 'components/LibraryCard/intex';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { libraryCardsSelector } from 'store/reducers/library/selectors';
// styles
import { DivListArea, ListName } from './styles';
import Search from '../Search';

const Library = () => {
  const libraryCards = useAppSelector(libraryCardsSelector);
  const { getLibraryCards } = useActionCreator();

  useEffect(() => {
    getLibraryCards();
  }, []);

  return (
    <DivListArea>
      <ListName>Library</ListName>
      <Search />
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
        {libraryCards.map((card, index) => {
          return (
            <List.Item key={card.id}>
              <LibraryCard card={card} libraryCardIndex={index} />
            </List.Item>
          );
        })}
      </List>
    </DivListArea>
  );
};

export default Library;
