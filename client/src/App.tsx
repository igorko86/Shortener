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
import { isAuthSelector, userSelector } from 'store/reducers/auth/selectors';
import { theme } from 'theme';
import useCheckAccess from 'shared/hooks/useCheckAccess';
import { Role } from 'shared/models/request/authRequest';
import Button from 'components/Items/Button';
import Home from 'shared/assets/icons/home';
import { useActionCreator } from 'shared/hooks/useActionCreator';
// Styles
import { DivMain } from 'styles';

const App: FC = () => {
  const isAuth = useAppSelector(isAuthSelector);
  const user = useAppSelector(userSelector);
  const show = useCheckAccess([Role.Admin, Role.Tutor]);

  const { changeRole } = useActionCreator();

  const handleClickButton = (role: Role) => {
    if (user?.role !== role) {
      changeRole(role);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <AppHeader />
        <Layout>
          <DivMain>
            {show && <AppSubHeader />}
            {isAuth && (
              <div>
                <Button text="Viewer" icon={<Home />} onClick={() => handleClickButton(Role.Viewer)} />
                <Button text="Student" icon={<Home />} onClick={() => handleClickButton(Role.Student)} />
                <Button text="Tutor" icon={<Home />} onClick={() => handleClickButton(Role.Tutor)} />
              </div>
            )}
            <AppRouter />
          </DivMain>
        </Layout>
        <Footer style={{ border: '1px solid red' }}>Footer</Footer>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
