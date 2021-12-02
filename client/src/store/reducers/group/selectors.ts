import { AppState } from '../../index';

export const groupsSelector = ({ group }: AppState) => group.groups;
export const planSelector = ({ group }: AppState) => group.plan;
