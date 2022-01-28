// External
import { FC } from 'react';
import { Layout } from 'antd';
import { ThemeProvider } from 'styled-components';
import { Footer } from 'antd/lib/layout/layout';
// Internal
import AppRouter from 'features/AppRouter';
import AppHeader from 'components/AppHeader';
import AppSubHeader from 'components/AppSubHeader';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { isAuthSelector } from 'store/reducers/auth/selectors';
import { theme } from 'theme';
// Styles
import { DivMain } from 'styles';
import useCheckAccess from './shared/hooks/useCheckAccess';
import { Role } from './shared/models/request/authRequest';

const App: FC = () => {
  const show = useCheckAccess([Role.Admin, Role.Tutor]);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <AppHeader />
        <Layout>
          <DivMain>
            {show && <AppSubHeader />}
            <AppRouter />
          </DivMain>
        </Layout>
        <Footer style={{ border: '1px solid red' }}>Footer</Footer>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
