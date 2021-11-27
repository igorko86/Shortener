import { Router } from 'express';

import groupController from '../controller/group.controller';

const groupRouter = Router();

groupRouter.get('', groupController.getGroups);
groupRouter.post('/group', groupController.createGroup);

export { groupRouter as groupRoutes };
