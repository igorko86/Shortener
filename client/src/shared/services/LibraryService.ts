import $api from '../../http';
import { ILibraryCardRequest } from '../models/request/libraryRequest';
import { ILibraryCardResponse } from '../models/response/libraryResponse';

class LibraryService {
  static async getLibraryCards(): Promise<ILibraryCardResponse[]> {
    return $api.get<ILibraryCardResponse[]>('/library/cards').then(({ data }) => data);
  }

  static async createLibraryCard(body: ILibraryCardRequest): Promise<void> {
    return $api.post('/library/card', body);
  }
}

export default LibraryService;
