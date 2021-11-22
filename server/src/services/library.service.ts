import { LibraryCard } from '../db/entites/LibraryCard';
import { IRequestCard, ITutorData } from './types.services';

class LibraryService {
  async createLibraryCard(data: IRequestCard): Promise<any> {
    const newCard = LibraryCard.create(data);

    return await newCard.save();
  }

  async getLibraryCards(): Promise<LibraryCard[]> {
    return await LibraryCard.find();
  }
}

export default new LibraryService();
