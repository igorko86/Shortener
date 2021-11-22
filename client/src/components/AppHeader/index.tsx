import { FC } from 'react';
import { Col, Menu, Row } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { Link } from 'react-router-dom';

import { AppPath } from 'shared/common/enum';

const AppHeader: FC = () => {
  return (
    <Header>
      <Row justify="end">
        <Col span={4}>
          <div style={{ border: '1px solid red' }}>LGOG</div>
        </Col>
        <Col span={8} offset={10}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="item1">
              <Link to={AppPath.CREATE_CARD}>Create Card</Link>
            </Menu.Item>
            <Menu.Item key="item2">item2</Menu.Item>
            <Menu.Item key="item3">item3</Menu.Item>
          </Menu>
        </Col>
        <Col span={2}>
          <Link to={AppPath.LOGIN}>Sign in</Link>

          <Link to={AppPath.REGISTRATION}>Sign up</Link>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
