import { Router } from 'express';
import libraryController from '../controller/library.controller';

const libraryRouter = Router();

libraryRouter.get('/cards', libraryController.getLibraryCards);
libraryRouter.post('/card', libraryController.createLibraryCard);

export { libraryRouter as libraryRoutes };
