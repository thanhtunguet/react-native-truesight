const fs = require('fs');
const path = require('path');
const { default: transform } = require('css-to-react-native-transform');
const sass = require('sass');
const { execSync } = require('child_process');

const filePath = path.resolve(__dirname, '..', 'src/styles/styles.bundle.scss');
const srcPath = path.resolve(__dirname, '..', 'src/styles/styles.scss');

const preBuild = sass.compile(srcPath, {
  style: 'compressed',
});

fs.writeFileSync(filePath, preBuild.css);

const css = fs.readFileSync(filePath, 'utf-8');

const js = transform(css);

fs.writeFileSync(
  path.resolve(__dirname, '..', 'src/styles/index.ts'),
  `import { StyleSheet } from 'react-native';

export const atomicStyles = StyleSheet.create(generatedStyles);
`.replace('generatedStyles', JSON.stringify(js, null, 2))
);

fs.unlinkSync(filePath);

console.log('Run: eslint src/styles/index.ts --fix');
execSync('yarn eslint src/styles/index.ts --fix');

console.log('Run: bob build');
execSync('yarn bob build');
