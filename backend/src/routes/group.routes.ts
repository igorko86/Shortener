import { Router } from 'express';

import groupController from '../controller/group.controller';

const groupRouter = Router();

groupRouter.get('', groupController.getGroupsById);

export { groupRouter as groupRoutes };
