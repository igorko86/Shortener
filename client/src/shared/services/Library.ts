import { AxiosResponse } from 'axios';

import { IAuthResponse } from '../models/response/authResponse';
import $api from '../../http';
import { ILibraryCardRequest } from '../models/request/library';

class LibraryService {
  static async getLibraryCards(): Promise<AxiosResponse<any>> {
    return $api.get<IAuthResponse>('/library/cards');
  }

  static async createCard(body: ILibraryCardRequest): Promise<AxiosResponse<any>> {
    return $api.post<IAuthResponse>('/library/card', body);
  }
}

export default LibraryService;
