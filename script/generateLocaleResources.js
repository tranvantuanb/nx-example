const jsonConcat = require('json-concat');
const fs = require('fs');
const set = require('lodash/set');
const supportLocales = require('../i18next-parser.config.js').locales;

let result = {};
supportLocales.forEach((locale) => {
  fs.readdirSync(`locales/${locale}`).forEach((file) => {
    set(
      result,
      `${locale}.${file.replace('.json', '')}`,
      JSON.parse(fs.readFileSync(`locales/${locale}/${file}`))
    );
  });
});

fs.writeFile(
  'locales/all-locales.json',
  JSON.stringify(result),
  function (err, result) {
    if (err) console.log('error', err);
  }
);

// console.log(result);
console.log('======== COMPLETE ========');
