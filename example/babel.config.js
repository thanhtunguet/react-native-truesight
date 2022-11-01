const path = require('path');
const pak = require('../package.json');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          [pak.name]: path.join(__dirname, '..', pak.source),
          'app.json': path.join(__dirname, 'app.json'),
          'package.json': path.join(__dirname, 'package.json'),
          'src': path.resolve(__dirname, 'src'),
          'assets': path.resolve(__dirname, 'assets'),
        },
      },
    ],
    'macros',
  ],
};
