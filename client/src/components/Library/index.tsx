// External
import React, { FC, useEffect } from 'react';
// Internal
import { useAppSelector } from 'shared/hooks/storeHooks';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { libraryCardsSelector } from 'store/reducers/library/selectors';
import LibraryColumn from '../Items/LibraryColumn';
// styles

const Library: FC = () => {
  const libraryCards = useAppSelector(libraryCardsSelector);
  const { getLibraryCards } = useActionCreator();

  useEffect(() => {
    getLibraryCards();
  }, []);

  return <LibraryColumn cards={libraryCards} title="Library" />;
};

export default Library;
