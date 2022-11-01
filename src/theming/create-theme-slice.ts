import { createSlice } from '@reduxjs/toolkit';
import type { ThemeSliceState, ThemeStyle, ThemingGlobalState } from './types';
import { transformColors } from './transform-colors';
import { globalStyles } from './global-styles';

function checkTheme(themes: Record<string, ThemeStyle>, theme: string) {
  if (!Object.prototype.hasOwnProperty.call(themes, theme)) {
    const error = new Error(`Your theme ${theme} is not defined`);
    console.log(error.stack);
    throw error;
  }
}

export function createThemeSlice<T = {}>(
  initialState: Omit<ThemeSliceState<T>, 'globalStyles'> = {
    themes: {},
    currentTheme: 'default',
  }
) {
  const { themes, currentTheme } = initialState;
  const themeStyle = themes[currentTheme];

  if (!Object.prototype.hasOwnProperty.call(themes, 'dark')) {
    console.warn(
      'You are missing the dark theme.' +
        '\n' +
        'It results that your app UI may be render unexpectedly if users set their devices to dark theme'
    );
  }

  return createSlice({
    name: 'theming',
    initialState: {
      ...initialState,
      globalStyles: transformColors(globalStyles, themeStyle!),
    },
    reducers: {
      setThemes(
        state: ThemingGlobalState['theming'],
        action: {
          type: string;
          payload: Record<string, ThemeStyle>;
        }
      ) {
        const { payload } = action;
        const { currentTheme: theme } = state;

        checkTheme(payload, theme);

        state = {
          ...state,
          themes: payload,
          globalStyles: transformColors(globalStyles, payload[theme]!),
        };
      },
      changeTheme(
        state: ThemingGlobalState['theming'],
        action: {
          type: string;
          payload: keyof ThemingGlobalState['theming']['themes'];
        }
      ) {
        const newTheme = action.payload;
        const { themes: themeMap } = state;

        checkTheme(themeMap, newTheme);

        state = {
          ...state,
          currentTheme: newTheme,
          globalStyles: transformColors(globalStyles, themeMap[newTheme]!),
        };
      },
    },
  });
}
