import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

import { AppPath } from 'shared/common/enum';
import CreateGroup from './CreateGroup';

const AppSubHeader = () => {
  const history = useHistory();

  return (
    <div>
      <Button onClick={() => history.push(AppPath.ROOT)}>home</Button>
      <CreateGroup />
      <Button onClick={() => history.push(AppPath.CREATE_CARD)}>create card</Button>
    </div>
  );
};

export default AppSubHeader;
