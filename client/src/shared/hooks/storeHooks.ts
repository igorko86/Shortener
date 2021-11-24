import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppState } from 'store';
import { AppDispatch } from '../../store/interfaces';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
