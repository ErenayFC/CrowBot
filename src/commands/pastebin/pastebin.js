const { SlashCommandBuilder } = require("discord.js");
const translation = require("../../../handlers/translate/translation");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const config = require("../../../config");
const defaultTranslationLanguage = config.defaultTranslationLanguage;
const translations = loadLanguage(14);

const createPaste = require("../../../handlers/pastebin/createPaste.js");
const listPaste = require("../../../handlers/pastebin/listPaste.js");
const delPaste = require("../../../handlers/pastebin/deletePaste.js");
const viewPaste = require("../../../handlers/pastebin/viewPaste.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(translations.names[defaultTranslationLanguage])
    .setDescription(translations.descriptions[defaultTranslationLanguage])
    .setNameLocalizations(translations.names)
    .setDescriptionLocalizations(translations.descriptions)
    .addStringOption((option) =>
      option
        .setName(translations.firstOptionNames[defaultTranslationLanguage])
        .setDescription(
          translations.firstOptionDescriptions[defaultTranslationLanguage]
        )
        .setNameLocalizations(translations.firstOptionNames)
        .setDescriptionLocalizations(translations.firstOptionDescriptions)
        .setRequired(true)
        .addChoices(
          {
            name: translations.firstOptionChoices.create.name,
            name_localizations:
              translations.firstOptionChoices.create.name_localizations,
            value: "create",
          },
          {
            name: translations.firstOptionChoices.list.name,
            name_localizations:
              translations.firstOptionChoices.list.name_localizations,
            value: "list",
          },
          {
            name: translations.firstOptionChoices.delete.name,
            name_localizations:
              translations.firstOptionChoices.delete.name_localizations,
            value: "delete",
          },
          {
            name: translations.firstOptionChoices.view.name,
            name_localizations:
              translations.firstOptionChoices.view.name_localizations,
            value: "view",
          }
        )
    )
    .addStringOption((option) =>
      option
        .setName(translations.secondOptionNames[defaultTranslationLanguage])
        .setDescription(
          translations.secondOptionDescriptions[defaultTranslationLanguage]
        )
        .setNameLocalizations(translations.secondOptionNames)
        .setDescriptionLocalizations(translations.secondOptionDescriptions)
        .setRequired(false)
    )
    .addBooleanOption((option) =>
      option
        .setName(translations.thirdOptionNames[defaultTranslationLanguage])
        .setDescription(
          translations.thirdOptionDescriptions[defaultTranslationLanguage]
        )
        .setNameLocalizations(translations.thirdOptionNames)
        .setDescriptionLocalizations(translations.thirdOptionDescriptions)
        .setRequired(false)
    ),
  run: async (client, interaction) => {
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    const action = interaction.options.getString(
      translations.firstOptionNames[defaultTranslationLanguage]
    );
    if (action === "create") createPaste(client, interaction);
    if (action === "list") listPaste(client, interaction);
    if (action === "delete") delPaste(client, interaction);
    if (action === "view") viewPaste(client, interaction);
  },
};
