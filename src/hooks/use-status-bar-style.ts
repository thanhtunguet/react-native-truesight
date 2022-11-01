import { StatusBar, StatusBarStyle } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export function useStatusBarStyle(style: StatusBarStyle) {
  useFocusEffect(() => {
    StatusBar.setBarStyle(style);
  });
}
