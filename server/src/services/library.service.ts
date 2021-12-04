import { LibraryCard } from '../db/entites/LibraryCard';
import { ICardRequest, ILibraryCardsResponse } from './interfaces';

class LibraryService {
  async createLibraryCard(data: ICardRequest): Promise<LibraryCard> {
    const newCard = LibraryCard.create(data);

    return newCard.save();
  }

  async getLibraryCards(): Promise<ILibraryCardsResponse[]> {
    return await LibraryCard.createQueryBuilder('libraryCard')
      .select(['libraryCard.id', 'libraryCard.title', 'libraryCard.description'])
      .getMany();
  }
}

export default new LibraryService();
