import { AppState } from '../../index';

export const isAuthSelector = ({ auth }: AppState) => auth.isAuth;
export const tutorSelector = ({ auth }: AppState) => auth.tutor;
