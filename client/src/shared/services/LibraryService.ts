import $api from '../../http';
import { ILibraryCardRequest } from '../models/request/libraryRequest';
import { ICardContentResponse, ILibraryCardResponse } from '../models/response/libraryResponse';
import { ApiRoutes } from './apiRoutes.constants';

class LibraryService {
  static async getLibraryCards(): Promise<ILibraryCardResponse[]> {
    return $api.get<ILibraryCardResponse[]>(ApiRoutes.GetCards).then(({ data }) => data);
  }

  static async getMyLibraryCards(): Promise<ILibraryCardResponse[]> {
    return $api.get<ILibraryCardResponse[]>(ApiRoutes.GetMyCards).then(({ data }) => data);
  }

  static async createLibraryCard(body: ILibraryCardRequest): Promise<void> {
    return $api.post(ApiRoutes.CreateCard, body);
  }

  static getCardContent(cardId: string): Promise<ICardContentResponse> {
    return $api.get(ApiRoutes.CardContent, { params: { cardId } }).then(({ data }) => data);
  }
}

export default LibraryService;
