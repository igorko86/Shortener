// External
import { FC } from 'react';
import { List as ListAnt } from 'antd';
// Internal
const { Item } = ListAnt;

interface IProps {
  data: { name: string }[];
}

const List: FC<IProps> = ({ data }) => {
  return (
    <ListAnt
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <Item>
          <Item.Meta
            title={<a href="https://ant.design">{item.name}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </Item>
      )}
    />
  );
};

export default List;
