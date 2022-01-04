// External
import React, { FC, useEffect } from 'react';
// Internal
import { useAppSelector } from 'shared/hooks/storeHooks';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { myLibraryCardsSelector } from 'store/reducers/library/selectors';
import LibraryColumn from '../Items/LibraryColumn';
// styles

const TutorLibrary: FC = () => {
  const myLibraryCards = useAppSelector(myLibraryCardsSelector);
  const { getMyLibraryCards } = useActionCreator();

  useEffect(() => {
    getMyLibraryCards();
  }, []);

  return (
    <LibraryColumn
      cards={myLibraryCards}
      title="My Library"
      buttonText="+ Add card"
      handleClick={() => console.log('hellooo')}
    />
  );
};

export default TutorLibrary;
