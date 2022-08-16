const fs = require('fs');
const child_process = require('child_process');
const supportLocales = require('../i18next-parser.config.js').locales;
const fse = require('fs-extra');

async function translate(modules, callback) {
  if (modules.length === 0) {
    console.log(`Translate complete`);
    fse.removeSync('tempLocales');
    return;
  }

  const fileName = modules.shift();
  console.log('Start translate ', fileName);
  const enContent = fs.readFileSync(`locales/en/${fileName}`);

  await fse.outputFile('tempLocales/en.json', enContent);

  child_process.exec(
    'i18n-translate-json AIzaSyDAxivn1Fpn7tLfu8nQyJm56wRazWhMVeo ./tempLocales en th,id,zh-TW',
    {},
    function (error) {
      if (error !== null) {
        console.log(`Translate ${fileName} error: ${error.toString()}`);
      } else {
        supportLocales.forEach(function (locale) {
          const content = fs.readFileSync(`tempLocales/${locale}.json`);
          fse.outputFile(`locales/${locale}/${fileName}`, content);
        });

        translate(modules, callback);
      }
    }
  );
}

translate(fs.readdirSync(`locales/en`));
