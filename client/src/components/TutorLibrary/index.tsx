// External
import React, { FC, useEffect } from 'react';
import { List } from 'antd';
// Internal
import LibraryCard from 'components/LibraryCard/intex';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { myLibraryCardsSelector } from 'store/reducers/library/selectors';
import ColumnWrapper from '../Items/ColumnWrapper';
import Search from '../Search';
import TitleColumn from '../Items/TitleColumn';
// styles

const TutorLibrary: FC = () => {
  const myLibraryCards = useAppSelector(myLibraryCardsSelector);
  const { getMyLibraryCards } = useActionCreator();

  useEffect(() => {
    getMyLibraryCards();
  }, []);

  return (
    <ColumnWrapper>
      <TitleColumn planName="My Library" />
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
        dataSource={myLibraryCards}
      >
        {myLibraryCards.map((card, index) => {
          return (
            <List.Item key={card.id}>
              <LibraryCard card={card} libraryCardIndex={index} />
            </List.Item>
          );
        })}
      </List>
    </ColumnWrapper>
  );
};

export default TutorLibrary;
