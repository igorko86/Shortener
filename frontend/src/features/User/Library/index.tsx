import { FC, ReactNode } from 'react';

import { ContentList, LibraryCollapse, LibrarySection, Panel } from './styles';

export interface ISubCard {
  id: string;
  cardId?: string;
  description: string;
  name: string;
}

export type LibraryCardType = Omit<ISubCard, 'cardId'>;

interface IProps {
  header?: ReactNode;
}
const Library: FC<IProps> = ({ header }) => {
  return (
    <LibrarySection>
      <div></div>
      <div>Library</div>
      <LibraryCollapse>
        <Panel header={header} key="collapse">
          <ContentList dataSource={[]}></ContentList>
        </Panel>
      </LibraryCollapse>
    </LibrarySection>
  );
};

export default Library;
