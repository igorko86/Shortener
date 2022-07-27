import { FC, useState } from 'react';

import LibraryCard from '../../components/LibraryCard';

import { ActionBlockDiv, ItemLi, LibrarySection, ListUl } from './styles';

export interface ISubCard {
  id: string;
  cardId?: string;
  description: string;
  name: string;
}

export type LibraryCardType = Omit<ISubCard, 'cardId'>;

const libraryCards: LibraryCardType[] = [
  {
    id: '1',
    description: 'It is our first card',
    name: 'FIrst asdsa sadasdas asdasdas a ascasfas asfasfd Card',
  },
  {
    id: '2',
    description:
      'It is our second carddsssssssssssc sdddddddddddddddddddd sddddddddddddddddddddddddddddd sdddddddddddddddddddddddc ',
    name: 'Second Card',
  },
];
const PublicLibrary: FC = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const selectItem = (id: string) => {
    setSelectedItem(id);
  };
  return (
    <LibrarySection>
      <ActionBlockDiv>icons</ActionBlockDiv>
      <div>Public Library</div>
      <ListUl>
        {libraryCards.map((card: LibraryCardType, index: number) => {
          const { id } = card;

          return (
            <ItemLi key={id} active={selectedItem === id} onClick={() => selectItem(id)}>
              <LibraryCard {...card} libraryCardIndex={index} />
            </ItemLi>
          );
        })}
      </ListUl>
    </LibrarySection>
  );
};

export default PublicLibrary;
