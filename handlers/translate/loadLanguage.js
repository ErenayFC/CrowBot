const fs = require("fs");
const path = require("path");
const { defaultTranslationLanguage } = require("../../config");

const languagePath = path.join(__dirname, "..", "..", "language");

module.exports = (id) => {
  const translations = {
    names: {},
    descriptions: {},
    firstOptionNames: {},
    firstOptionDescriptions: {},
    firstOptionChoices: {},
    secondOptionNames: {},
    secondOptionDescriptions: {},
    secondOptionChoices: {},
    thirdOptionNames: {},
    thirdOptionDescriptions: {},
    thirdOptionChoices: {},
  };

  const languageFiles = fs
    .readdirSync(languagePath)
    .filter((file) => path.extname(file) === ".js");
  let defaultTranslation = null;

  languageFiles.forEach((file) => {
    const locale = file.split(".js")[0];
    const filePath = path.join(languagePath, file);

    try {
      const translationData = require(filePath);
      const translation = translationData.find((entry) => entry.id === id);
      if (translation) {
        translations.names[locale] = translation.name;
        translations.descriptions[locale] = translation.description;
        translations.firstOptionNames[locale] =
          translation.firstOptions?.name ?? {};
        translations.firstOptionDescriptions[locale] =
          translation.firstOptions?.description ?? {};

        if (translation.firstOptions?.choices) {
          Object.entries(translation.firstOptions.choices).forEach(
            ([key, value]) => {
              if (!translations.firstOptionChoices[key]) {
                translations.firstOptionChoices[key] = {
                  name: "",
                  name_localizations: {},
                };
              }
              if (locale === defaultTranslationLanguage) {
                translations.firstOptionChoices[key].name = value;
              }
              translations.firstOptionChoices[key].name_localizations[locale] =
                value;
            }
          );
        }

        translations.secondOptionNames[locale] =
          translation.secondOptions?.name ?? {};
        translations.secondOptionDescriptions[locale] =
          translation.secondOptions?.description ?? {};

        if (translation.secondOptions?.choices) {
          Object.entries(translation.secondOptions.choices).forEach(
            ([key, value]) => {
              if (!translations.secondOptionChoices[key]) {
                translations.secondOptionChoices[key] = {
                  name: "",
                  name_localizations: {},
                };
              }
              if (locale === defaultTranslationLanguage) {
                translations.secondOptionChoices[key].name = value;
              }
              translations.secondOptionChoices[key].name_localizations[locale] =
                value;
            }
          );
        }

        translations.thirdOptionNames[locale] =
          translation.thirdOptions?.name ?? {};
        translations.thirdOptionDescriptions[locale] =
          translation.thirdOptions?.description ?? {};

        if (translation.thirdOptions?.choices) {
          Object.entries(translation.thirdOptions.choices).forEach(
            ([key, value]) => {
              if (!translations.thirdOptionChoices[key]) {
                translations.thirdOptionChoices[key] = {
                  name: "",
                  name_localizations: {},
                };
              }
              if (locale === defaultTranslationLanguage) {
                translations.thirdOptionChoices[key].name = value;
              }
              translations.thirdOptionChoices[key].name_localizations[locale] =
                value;
            }
          );
        }

        if (locale === defaultTranslationLanguage) {
          defaultTranslation = translation;
        }
      }
    } catch (error) {
      console.error(`Dil dosyası yüklenirken hata oluştu: ${error.stack}`);
    }
  });

  if (!defaultTranslation) {
    const defaultFilePath = path.join(
      languagePath,
      `${defaultTranslationLanguage}.js`
    );
    try {
      const defaultTranslationData = require(defaultFilePath);
      defaultTranslation = defaultTranslationData.find(
        (entry) => entry.id === id
      );
      if (defaultTranslation) {
        translations.names[defaultTranslationLanguage] =
          defaultTranslation.name;
        translations.descriptions[defaultTranslationLanguage] =
          defaultTranslation.description;
        translations.firstOptionNames[defaultTranslationLanguage] =
          defaultTranslation.firstOptions?.name ?? {};
        translations.firstOptionDescriptions[defaultTranslationLanguage] =
          defaultTranslation.firstOptions?.description ?? {};

        if (defaultTranslation.firstOptions?.choices) {
          Object.entries(defaultTranslation.firstOptions.choices).forEach(
            ([key, value]) => {
              if (!translations.firstOptionChoices[key]) {
                translations.firstOptionChoices[key] = {
                  name: value,
                  name_localizations: {},
                };
              }
              translations.firstOptionChoices[key].name_localizations[
                defaultTranslationLanguage
              ] = value;
            }
          );
        }

        translations.secondOptionNames[defaultTranslationLanguage] =
          defaultTranslation.secondOptions?.name ?? {};
        translations.secondOptionDescriptions[defaultTranslationLanguage] =
          defaultTranslation.secondOptions?.description ?? {};

        if (defaultTranslation.secondOptions?.choices) {
          Object.entries(defaultTranslation.secondOptions.choices).forEach(
            ([key, value]) => {
              if (!translations.secondOptionChoices[key]) {
                translations.secondOptionChoices[key] = {
                  name: value,
                  name_localizations: {},
                };
              }
              translations.secondOptionChoices[key].name_localizations[
                defaultTranslationLanguage
              ] = value;
            }
          );
        }

        translations.thirdOptionNames[defaultTranslationLanguage] =
          defaultTranslation.thirdOptions?.name ?? {};
        translations.thirdOptionDescriptions[defaultTranslationLanguage] =
          defaultTranslation.thirdOptions?.description ?? {};

        if (defaultTranslation.thirdOptions?.choices) {
          Object.entries(defaultTranslation.thirdOptions.choices).forEach(
            ([key, value]) => {
              if (!translations.thirdOptionChoices[key]) {
                translations.thirdOptionChoices[key] = {
                  name: value,
                  name_localizations: {},
                };
              }
              translations.thirdOptionChoices[key].name_localizations[
                defaultTranslationLanguage
              ] = value;
            }
          );
        }
      }
    } catch (error) {
      console.error(
        `Varsayılan dil dosyası yüklenirken hata oluştu: ${error.stack}`
      );
    }
  }

  return translations;
};
