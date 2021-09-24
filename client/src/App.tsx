import { FC } from 'react';
import { Layout } from 'antd';

import AppRouter from './components/AppRouter';

const { Header, Content, Footer } = Layout;

const App: FC = () => {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <AppRouter />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default App;
