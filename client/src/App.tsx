import { FC } from 'react';
import { Layout } from 'antd';
import { ThemeProvider } from 'styled-components';

import AppRouter from 'components/AppRouter';
import AppHeader from 'components/AppHeader';
import { theme } from './theme';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <AppHeader />
        <div>SUB HEADER</div>
        <Layout>
          <AppRouter />
        </Layout>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
