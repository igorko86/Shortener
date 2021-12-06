import { Router } from 'express';
import libraryController from '../controller/library.controller';

const libraryRouter = Router();

libraryRouter.get('/cards', libraryController.getLibraryCards);
libraryRouter.post('/card', libraryController.createLibraryCard);
libraryRouter.get('/card/content', libraryController.getCardContent);

export { libraryRouter as libraryRoutes };
