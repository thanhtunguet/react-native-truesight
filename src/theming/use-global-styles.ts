import { useSelector } from 'react-redux';
import { globalStylesSelector } from './selectors';
import type { ThemeSliceState } from './types';

export function useGlobalStyles<T = {}>(): ThemeSliceState<T>['globalStyles'] {
  return useSelector(globalStylesSelector);
}
