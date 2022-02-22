import $api from '../../http';
import { ILibraryCardRequest } from '../models/request/libraryRequest';
import {
  ICardContentResponse,
  IExerciseContentResponse,
  IExerciseResponse,
  ILibraryCardResponse,
} from '../models/response/libraryResponse';
import { ApiRoutes } from './apiRoutes.constants';
import { ICreateExerciseRequest } from '../models/request/studentRequest';
import { Type } from 'store/reducers/library/types';

class LibraryService {
  static async getLibraryCards(search: string, type: Type): Promise<ILibraryCardResponse[]> {
    return $api.get<ILibraryCardResponse[]>(ApiRoutes.GetCards, { params: { search, type } }).then(({ data }) => data);
  }

  static async createLibraryCard(body: ILibraryCardRequest): Promise<void> {
    return $api.post(ApiRoutes.CreateCard, body);
  }

  static createExercise(body: ICreateExerciseRequest): Promise<IExerciseResponse> {
    return $api.post(ApiRoutes.CreateExercise, body).then(({ data }) => data);
  }

  static getExerciseContent(id: string): Promise<IExerciseContentResponse> {
    return $api.get(ApiRoutes.GetExerciseContent, { params: { id } }).then(({ data }) => data);
  }

  static getCardExplanation(cardId: string): Promise<ICardContentResponse> {
    return $api.get(ApiRoutes.CardContent, { params: { cardId } }).then(({ data }) => data);
  }

  static getCardExercisesList(cardId: string): Promise<IExerciseResponse[]> {
    return $api.get(ApiRoutes.GetExerciseList, { params: { cardId } }).then(({ data }) => data);
  }

  static geExercisesByUserId(userId: string, search: string): Promise<IExerciseResponse[]> {
    return $api.get(ApiRoutes.GetExercisesNewCard, { params: { id: userId, search } }).then(({ data }) => data);
  }

  static removeExercisesByIds(ids: string[]): Promise<void> {
    return $api.delete(ApiRoutes.RemoveExercisesByIds, { data: ids });
  }
}

export default LibraryService;
