const fs = require("fs");
const path = require("path");

module.exports = (locale, id) => {
  return new Promise((resolve, reject) => {
    const directoryPath = path.join(__dirname, "..", "..", "language");
    const locales = [];
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.log("Dosyaları okurken bir hata oluştu:", err);
        return reject(err);
      }

      files.forEach((file) => {
        if (path.extname(file) === ".json") {
          locales.push(file.split(".json")[0]);
        }
      });

      let selectedLanguage = "en-US";
      if (locales.includes(locale)) selectedLanguage = locale;

      try {
        const translationFile = require(`../../language/${selectedLanguage}.json`);
        const translatedContent = translationFile.find(
          (translation) => translation.id === id
        ).content;

        resolve(translatedContent);
      } catch (error) {
        reject(error);
      }
    });
  });
};
