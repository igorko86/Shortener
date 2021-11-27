import { LibraryCard } from '../db/entites/LibraryCard';
import { ICardRequest, ITutorData } from './types';

class LibraryService {
  async createLibraryCard(data: ICardRequest): Promise<any> {
    const newCard = LibraryCard.create(data);

    return newCard.save();
  }

  async getLibraryCards(): Promise<LibraryCard[]> {
    return LibraryCard.find();
  }
}

export default new LibraryService();
