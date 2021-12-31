// External
import { FC } from 'react';
import { Layout } from 'antd';
import { ThemeProvider } from 'styled-components';
// Internal
import AppRouter from 'AppRouter';
import AppHeader from 'components/AppHeader';
import { theme } from 'theme';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <AppHeader />
        <Layout>
          <AppRouter />
        </Layout>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
