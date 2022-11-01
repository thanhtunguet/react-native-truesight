import { useSelector } from 'react-redux';
import { themeSelector, themesSelector } from './selectors';
import React from 'react';
import type { ThemeStyle } from './types';

export function useThemeValue<T = {}>(key: keyof ThemeStyle | keyof T) {
  const currentTheme = useSelector(themeSelector);

  const themeMap = useSelector(themesSelector);

  return React.useMemo(() => {
    // @ts-ignore
    return themeMap[currentTheme][key]!;
  }, [currentTheme, key, themeMap]);
}
