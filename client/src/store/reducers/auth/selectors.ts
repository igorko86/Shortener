import { AppState } from '../../index';

export const isAuthSelector = ({ auth }: AppState) => auth.isAuth;
export const userSelector = ({ auth }: AppState) => auth.user;
