import React from 'react';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { themeSelector } from './selectors';
import type { ThemeSliceState, ThemeStyle } from './types';
import { transformColors } from './transform-colors';
import { useThemes } from './use-themes';

export const themes: Record<string, ThemeStyle> = {};

type NativeStyle = ViewStyle | TextStyle | ImageStyle;

export function useStyle<T = {}>(
  styles: Record<string, NativeStyle>
): Record<string, NativeStyle> {
  const currentTheme = useSelector(themeSelector);

  const themeMap: ThemeSliceState<T>['themes'] = useThemes<T>();

  return React.useMemo(() => {
    return StyleSheet.create(
      transformColors<T>(styles, themeMap[currentTheme]!)
    );
  }, [currentTheme, styles, themeMap]);
}
