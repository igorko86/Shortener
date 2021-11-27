import { FC } from 'react';

const CardContent: FC = () => {
  return true ? (
    <div style={{ width: '100%' }}>Default CardContent</div>
  ) : (
    <div>CardContent when we clicked on one of the cards in Plan/ Library/Own library</div>
  );
};

export default CardContent;
