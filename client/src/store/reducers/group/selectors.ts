import { AppState } from '../../index';

export const groupsSelector = ({ group }: AppState) => group.groups;

export const studentsSelector = ({ group }: AppState) => group.students;

export const planSelector = ({ group }: AppState) => group.plan;
