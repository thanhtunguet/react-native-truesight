import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { ThemeSliceState, ThemeStyle } from './types';

const regex = /^"?@([A-Za-z0-9]+)"?$/;

export function transformColors<T = {}>(
  styles: Partial<ThemeSliceState['globalStyles']>,
  themeStyle: ThemeStyle & T
): Partial<ThemeSliceState['globalStyles']> {
  return Object.fromEntries<TextStyle | ViewStyle | ImageStyle>(
    Object.entries<TextStyle | ViewStyle | ImageStyle>(styles).map(
      ([className, style]) => {
        const newStyle = Object.fromEntries(
          Object.entries(style).map(([property, value]) => {
            if (typeof value === 'string') {
              if (value.match(regex)) {
                const key: keyof ThemeStyle = value.replace(
                  regex,
                  '$1'
                ) as keyof ThemeStyle & T;
                return [property, themeStyle[key]];
              }
            }
            return [property, value];
          })
        );
        return [className, newStyle];
      }
    )
  );
}
