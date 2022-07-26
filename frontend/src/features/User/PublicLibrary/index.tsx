import { FC } from 'react';
import { List } from 'antd';
import { LibrarySection } from './styles';
import Library from '../Library';
import Header from './Header';

export interface ISubCard {
  id: string;
  cardId?: string;
  description: string;
  name: string;
}

export type LibraryCardType = Omit<ISubCard, 'cardId'>;

const PublicLibrary: FC = () => {
  return (
    <>
      <Library header={<Header />} />
    </>
  );
};

export default PublicLibrary;
