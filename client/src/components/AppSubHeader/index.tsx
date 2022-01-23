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
import CreateCourse from './CreateCourse';
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
        <CreateCourse />
        <AddStudent />
        <Button text="Create card" onClick={() => handleClickButton(AppPath.LIBRARY_CARD)} />
        <Button text="Information" onClick={() => handleClickButton(AppPath.INFORMATION)} />
        <Button text="Students" icon={<Students />} onClick={() => handleClickButton(AppPath.STUDENTS)} />
        <Button text="Plans" icon={<Plans />} />
      </Space>
    </DivSubHeader>
  );
};

export default AppSubHeader;
