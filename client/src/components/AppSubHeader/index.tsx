// External
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Space } from 'antd';
// Internal
import { AppPath } from 'shared/common/enum';
import Home from 'shared/assets/icons/home';
import Button from 'components/Items/Button';
import Plans from 'shared/assets/icons/plans';
import Students from 'shared/assets/icons/students';
import AddStudents from 'shared/assets/icons/addStudent';
import CreateGroup from './CreateGroup';
import AddStudent from './AddStudent';
// Styles
import { DivSubHeader } from './styles';

const AppSubHeader: FC = () => {
  const history = useHistory();

  const handleClickButton = (path: string) => {
    history.push(path);
  };

  return (
    <DivSubHeader>
      <Space size="middle">
        <Button text="Home" icon={<Home />} onClick={() => handleClickButton(AppPath.ROOT)} />
        <CreateGroup />
        <AddStudent />
        <Button text="create card" onClick={() => handleClickButton(AppPath.CREATE_CARD)} />
        <Button text="Students" icon={<Students />} />
        <Button text="Plans" icon={<Plans />} />
        <Button text="Add Students" icon={<AddStudents />} />
      </Space>
    </DivSubHeader>
  );
};

export default AppSubHeader;
