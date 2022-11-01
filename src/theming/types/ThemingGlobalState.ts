import type { ThemeSliceState } from './ThemeSliceState';

export interface ThemingGlobalState<T = {}> {
  theming: ThemeSliceState<T>;
}
