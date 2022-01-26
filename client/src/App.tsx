// External
import { FC } from 'react';
import { Layout } from 'antd';
import { ThemeProvider } from 'styled-components';
import { Footer } from 'antd/lib/layout/layout';
// Internal
import AppRouter from 'AppRouter';
import AppHeader from 'components/AppHeader';
import { theme } from 'theme';
import { DivMain } from 'styles';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <AppHeader />
        <Layout>
          <DivMain>
            <AppRouter />
          </DivMain>
        </Layout>
        <Footer style={{ border: '1px solid red' }}>Footer</Footer>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
