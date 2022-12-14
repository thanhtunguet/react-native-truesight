import { Platform } from 'react-native';
import React from 'react';
import type { NavigationContainerRef } from '@react-navigation/native';

export const IOS = Platform.OS === 'ios';

export const ANDROID = Platform.OS === 'android';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export enum RadiusSize {
  X = 5,
  M = 10,
  L = 12,
  XL = 16,
  XXL = 22,
  XXXL = 40,
}

export enum IconSize {
  SMALL = 16,
  MEDIUM = 24,
  LARGE = 32,
  X_LARGE = 36,
  XXX_LARGE = 40,
}

export enum DevEnvironment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export * from './components';

export * from './hooks';

export * from './services';

export * from './styles';

export * from './theming';

export * from './TruesightView';
