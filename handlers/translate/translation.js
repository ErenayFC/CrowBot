const fs = require("fs");
const path = require("path");
const config = require("../../config");

module.exports = (locale, id, client) => {
  return new Promise((resolve, reject) => {
    const directoryPath = path.join(__dirname, "..", "..", "language");
    const locales = [];
    fs.readdir(directoryPath, async (err, files) => {
      if (err) {
        console.log("Dosyaları okurken bir hata oluştu:", err);
        return reject(err);
      }

      files.forEach((file) => {
        if (path.extname(file) === ".js") {
          locales.push(file.split(".js")[0]);
        }
      });

      let selectedLanguage = config.defaultTranslationLanguage;
      if (locales.includes(locale)) selectedLanguage = locale;

      try {
        const translationFilePath = path.join(directoryPath, `${selectedLanguage}.js`);
        delete require.cache[require.resolve(translationFilePath)];
        const translationFile = require(translationFilePath);
        const translatedContent = translationFile.find(
          (translation) => translation.id === id
        );
        if (translatedContent) {
          Object.keys(translatedContent).forEach((key) => {
            if (typeof translatedContent[key] === "string") {
              translatedContent[key] = translatedContent[key]
                .replaceAll(/{{client}}/g, client.user.username)
                .replaceAll(/{{sponsor}}/g, config.sponsor.name);
            } else if (typeof translatedContent[key] === "object") {
              Object.keys(translatedContent[key]).forEach((subKey) => {
                if (typeof translatedContent[key][subKey] === "string") {
                  translatedContent[key][subKey] = translatedContent[key][
                    subKey
                  ]
                    .replaceAll(/{{client}}/g, client.user.username)
                    .replaceAll(/{{sponsor}}/g, config.sponsor.name);
                }
              });
            }
          });

          resolve(translatedContent.content);
        } else {
          console.log(`İçerik bulunamadı. İd: ${id}`);
          resolve(null); // veya resolve("İçerik bulunamadı. ID: ${id}");
        }
      } catch (error) {
        console.error(`Dil dosyası yüklenirken hata oluştu: ${error.stack}`);
        reject(error);
      }
    });
  });
};