#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const { version } = require('../package.json');
const sassMapToJson = require('sass-maps-to-json');
const camelCase = require('lodash/camelCase');

function pascalCase(value) {
  const result = camelCase(value);
  return result.charAt(0).toUpperCase() + result.substr(1);
}

program
  .version(version)
  .argument('<input>')
  .argument('[output]')
  .option('-t, --timeout <timeout>', 'Timeout', 3000)
  .action(async (input, output = 'src/styles/colors.ts', options = {}) => {
    const temp = 'generate-colors.temp.json';
    sassMapToJson({
      src: input,
      dest: temp,
    });
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, options.timeout);
    });
    const content = JSON.parse(fs.readFileSync(temp, 'utf-8'));
    const {
      context: {
        colors: {
          Other: { swatches },
        },
      },
    } = content;

    const template = fs.readFileSync(
      path.resolve(__dirname, '../src/template.hbs'),
      'utf-8'
    );

    let properties = '';
    swatches.forEach(({ name, hex }, index) => {
      properties += `${index > 0 ? '\t' : ''}${pascalCase(name)} = '${hex}',\n`;
    });
    const outputContent = template.replace('{{properties}}', properties);
    fs.writeFileSync(output, outputContent);

    fs.unlinkSync(temp);
  });

program.parse(process.argv);
