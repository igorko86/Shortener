import { FC } from 'react';
import { Layout } from 'antd';

import AppRouter from 'components/AppRouter';
import AppHeader from 'components/AppHeader';

const { Content, Footer } = Layout;
const App: FC = () => {
  console.log('HERE');
  return (
    <Layout className="layout">
      <AppHeader />
      <Content>
        <AppRouter />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default App;
