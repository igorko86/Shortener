import { NextFunction, Request, Response } from 'express';

import libraryService from '../services/library.service';

class LibraryController {
  async getLibraryCards(req: Request, res: Response, next: NextFunction) {
    try {
      const cards = await libraryService.getLibraryCards();

      return res.status(200).json(cards);
    } catch (error) {
      next(error);
    }
  }

  async createLibraryCard(req: Request, res: Response, next: NextFunction) {
    try {
      const newCard = await libraryService.createLibraryCard(req.body);

      return res.status(200).json(newCard);
    } catch (error) {
      next(error);
    }
  }
}

export default new LibraryController();
