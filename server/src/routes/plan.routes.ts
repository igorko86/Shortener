import { Router } from 'express';

import planController from '../controller/plan.controller';

const planRouter = Router();

planRouter.get('/plan', planController.getPlan);
planRouter.post('/plan/card', planController.createPlanCardById);
planRouter.delete('/plan/card', planController.deletePlanCardById);
planRouter.put('/plan/card/movement', planController.movePlanCardId);
planRouter.put('/plan/card/subCard/movement', planController.moveSubCard);

export { planRouter as planRoutes };
