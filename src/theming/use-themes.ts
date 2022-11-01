import type { ThemeSliceState, ThemingGlobalState } from './types';
import { useSelector } from 'react-redux';

export function useThemes<T = {}>(): ThemeSliceState<T>['themes'] {
  return useSelector((state: ThemingGlobalState<T>) => state.theming.themes);
}
