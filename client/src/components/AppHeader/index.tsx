// External
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Menu, Row } from 'antd';
import { Header } from 'antd/lib/layout/layout';
// Internal
import { AppPath } from 'shared/common/enum';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { isAuthSelector, tutorSelector } from 'store/reducers/auth/selectors';
import { useActionCreator } from '../../shared/hooks/useActionCreator';

const AppHeader: FC = () => {
  const history = useHistory();
  // const dispatch = useDispatch();
  const { logout } = useActionCreator();
  const isAuth = useAppSelector(isAuthSelector);
  const tutor = useAppSelector(tutorSelector);

  const handleClickLogOut = () => {
    logout();
  };

  return (
    <Header>
      <Row justify="end">
        <Col span={4}>
          <div style={{ border: '1px solid red', color: 'white' }}>LOGO</div>
        </Col>
        <Col span={8} offset={6}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="item1">About</Menu.Item>
            <Menu.Item key="item2">Info</Menu.Item>
            <Menu.Item key="item3">Help</Menu.Item>
          </Menu>

          {/* <Popover /> */}
        </Col>
        {isAuth ? (
          <>
            <Col span={1}>
              <span style={{ color: 'white' }}>{tutor?.name}</span>
            </Col>
            <Col span={2}>
              <Menu theme="dark" mode="horizontal">
                <Menu.Item key={AppPath.LOGOUT} onClick={handleClickLogOut}>
                  Sign out
                </Menu.Item>
              </Menu>
            </Col>
          </>
        ) : (
          <Col span={4}>
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key={AppPath.LOGIN} onClick={() => history.push(AppPath.LOGIN)}>
                Sign in
              </Menu.Item>
              <Menu.Item key={AppPath.REGISTRATION} onClick={() => history.push(AppPath.REGISTRATION)}>
                Sign up
              </Menu.Item>
            </Menu>
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default AppHeader;
