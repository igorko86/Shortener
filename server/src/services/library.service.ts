import { LibraryCard } from '../db/entites/LibraryCard';
import { ICardContentResponse, ICardRequest, ILibraryCardsResponse, LibraryType } from './interfaces';
import apiErrorService from './apiError.service';
import exerciseService from './exercise.service';

class LibraryService {
  async createLibraryCard(data: ICardRequest): Promise<LibraryCard> {
    const { exerciseIds, ...res } = data;
    const newCard = LibraryCard.create(res);

    const savedCard = await newCard.save();

    if (exerciseIds) {
      exerciseService.updateExercises(exerciseIds, { libraryCard: savedCard });
    }

    return savedCard;
  }

  async getLibraryCards(libraryType: LibraryType, value?: string): Promise<ILibraryCardsResponse[]> {
    const query = LibraryCard.createQueryBuilder('libraryCard')
      .select(['libraryCard.id', 'libraryCard.name', 'libraryCard.description'])
      .where('libraryCard.type = :type', { type: libraryType });

    if (value) {
      query
        .andWhere('libraryCard.name like :value', { value: `%${value}%` })
        .orWhere('libraryCard.description like :value', { value: `%${value}%` })
        .andWhere('libraryCard.type = :type', { type: libraryType });
    }

    return await query.getMany();
  }

  async getCardExplanation(id: any): Promise<ICardContentResponse> {
    const libraryCardData = await LibraryCard.findOne(id);

    if (!libraryCardData) {
      throw apiErrorService.badRequest(`Card with such "${id}" id doesn't exists`);
    }
    const { name, htmlContent, description } = libraryCardData;

    return { htmlContent, name, description };
  }
}

export default new LibraryService();
