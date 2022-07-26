import { FC } from 'react';
import { List } from 'antd';
import { LibrarySection } from './styles';
import Library from '../Library';

export interface ISubCard {
  id: string;
  cardId?: string;
  description: string;
  name: string;
}

export type LibraryCardType = Omit<ISubCard, 'cardId'>;

const MyLibrary: FC = () => {
  return (
    <>
      <Library />
    </>
  );
};

export default MyLibrary;
