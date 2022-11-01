import type { TextStyle, ViewStyle } from 'react-native';
import type { ThemeStyle } from './ThemeStyle';

export interface ThemeSliceState<T = {}> {
  themes: Record<string, ThemeStyle & T>;

  currentTheme: keyof this['themes'];

  globalStyles: {
    textPrimary?: TextStyle;

    textSecondary?: TextStyle;

    textWarning?: TextStyle;

    textInfo?: TextStyle;

    textSuccess?: TextStyle;

    textDanger?: TextStyle;

    textMuted?: TextStyle;

    textLight?: TextStyle;

    textDark?: TextStyle;

    textWhite?: TextStyle;

    bgPrimary?: ViewStyle;

    bgSecondary?: ViewStyle;

    bgSuccess?: ViewStyle;

    bgDanger?: ViewStyle;

    bgInfo?: ViewStyle;

    bgWarning?: ViewStyle;

    bgLight?: ViewStyle;

    bgDark?: ViewStyle;

    bgWhite?: ViewStyle;
  };
}
