// External
import { FC } from 'react';
import { Layout } from 'antd';
import { ThemeProvider } from 'styled-components';
// Internal
import AppRouter from 'components/AppRouter';
import AppHeader from 'components/AppHeader';
import { theme } from 'theme';
import { Footer } from 'antd/lib/layout/layout';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <AppHeader />
        <Layout>
          <AppRouter />
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
