import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgIcon } from 'react-native-truesight';

export default function App() {
  return (
    <View style={styles.container}>
      <SvgIcon component={require('../assets/icons/icon.svg')} />

      <SvgIcon
        component={require('../assets/icons/icon.svg')}
        solid={true}
        fill="#FF0000"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
