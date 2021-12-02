import { Router } from 'express';

import groupController from '../controller/group.controller';

const groupRouter = Router();

groupRouter.get('', groupController.getGroups);
groupRouter.post('/group', groupController.createGroupAndPlan);

export { groupRouter as groupRoutes };
