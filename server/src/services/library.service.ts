import { LibraryCard } from '../db/entites/LibraryCard';
import { ICardContentResponse, ICardRequest, ILibraryCardsResponse } from './interfaces';
import apiErrorService from './apiError.service';

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

  async getCardContent(id: any): Promise<ICardContentResponse> {
    const libraryCardData = await LibraryCard.findOne(id);

    if (!libraryCardData) {
      throw apiErrorService.badRequest(`Card with such "${id}" id doesn't exists`);
    }

    return { htmlContent: libraryCardData.htmlContent };
  }
}

export default new LibraryService();
