import { LibraryCard } from '../db/entites/LibraryCard';
import { ICardRequest } from './interfaces';

class LibraryService {
  async createLibraryCard(data: ICardRequest): Promise<LibraryCard> {
    const newCard = LibraryCard.create(data);

    return newCard.save();
  }

  async getLibraryCards(): Promise<LibraryCard[]> {
    return LibraryCard.find();
  }
}

export default new LibraryService();
