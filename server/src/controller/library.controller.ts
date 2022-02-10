import { NextFunction, Request, Response } from 'express';

import libraryService from '../services/library.service';
import { Type } from '../services/interfaces';

class LibraryController {
  async getLibraryCards(req: Request, res: Response, next: NextFunction) {
    try {
      const { search, type } = req.query;

      const cards = await libraryService.getLibraryCards(type as Type, search as string);

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

  async getCardExplanation(req: Request, res: Response, next: NextFunction) {
    try {
      const newCard = await libraryService.getCardExplanation(req.query.cardId);

      return res.status(200).json(newCard);
    } catch (error) {
      next(error);
    }
  }
}

export default new LibraryController();
