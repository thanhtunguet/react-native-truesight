const sassMapToJson = require('sass-maps-to-json');
const fs = require('fs');

function transformJson(path) {
  const json = JSON.parse(fs.readFileSync(path, 'utf8'));
  const {
    context: {
      colors: {
        Other: { swatches },
      },
    },
  } = json;
  const obj = Object.fromEntries(swatches.map(({ name, hex }) => [name, hex]));
  fs.writeFileSync(path, JSON.stringify(obj, null, 2));
}

async function sleep(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async () => {
  sassMapToJson({
    src: 'src/partials/_colors.scss',
    dest: 'src/colors.json',
  });
  sassMapToJson({
    src: 'src/partials/_font-families.scss',
    dest: 'src/font-families.json',
  });
  await sleep(1000);
  transformJson('src/colors.json');
  transformJson('src/font-families.json');
})();
