const fs = require("fs");
const path = require("path");

const languagePath = path.join(__dirname, "..", "..", "language");

module.exports = (id) => {
  const translations = {
    names: {},
    descriptions: {},
    firstOptionNames: {},
    firstOptionDescriptions: {},
    secondOptionNames: {},
    secondOptionDescriptions: {},
    thirdOptionNames: {},
    thirdOptionDescriptions: {},
  };

  const languageFiles = fs
    .readdirSync(languagePath)
    .filter((file) => path.extname(file) === ".json");
  let defaultTranslation = null;

  languageFiles.forEach((file) => {
    const locale = file.split(".json")[0];
    const filePath = `${languagePath}/${file}`;

    try {
      const fileData = fs.readFileSync(filePath, "utf8");
      const translation = JSON.parse(fileData).find((entry) => entry.id === id);
      if (translation) {
        translations.names[locale] = translation.name;
        translations.descriptions[locale] = translation.description;
        translations.firstOptionNames[locale] =
          translation.firstOptions?.name ?? {};
        translations.firstOptionDescriptions[locale] =
          translation.firstOptions?.description ?? {};
        translations.secondOptionNames[locale] =
          translation.secondOptions?.name ?? {};
        translations.secondOptionDescriptions[locale] =
          translation.secondOptions?.description ?? {};
        translations.thirdOptionNames[locale] =
          translation.thirdOptions?.name ?? {};
        translations.thirdOptionDescriptions[locale] =
          translation.thirdOptions?.description ?? {};
        if (locale === "en-US") {
          defaultTranslation = translation;
        }
      }
    } catch (error) {
      console.error(`Dil dosyası yüklenirken hata oluştu: ${error.stack}`);
    }
  });

  if (!defaultTranslation) {
    const defaultFilePath = `${languagePath}/en-US.json`;
    try {
      const defaultFileData = fs.readFileSync(defaultFilePath, "utf8");
      defaultTranslation = JSON.parse(defaultFileData).find(
        (entry) => entry.id === id
      );
      if (defaultTranslation) {
        translations.names["en-US"] = defaultTranslation.name;
        translations.descriptions["en-US"] = defaultTranslation.description;
        translations.firstOptionNames["en-US"] =
          defaultTranslation.firstOptions?.name ?? {};
        translations.firstOptionDescriptions["en-US"] =
          defaultTranslation.firstOptions?.description ?? {};
        translations.secondOptionNames["en-US"] =
          defaultTranslation.secondOptions?.name ?? {};
        translations.secondOptionDescriptions["en-US"] =
          defaultTranslation.secondOptions?.description ?? {};
        translations.thirdOptionNames["en-US"] =
          defaultTranslation.thirdOptions?.name ?? {};
        translations.thirdOptionDescriptions["en-US"] =
          defaultTranslation.thirdOptions?.description ?? {};
      }
    } catch (error) {
      console.error(
        `Varsayılan dil dosyası yüklenirken hata oluştu: ${error.stack}`
      );
    }
  }

  return translations;
};
