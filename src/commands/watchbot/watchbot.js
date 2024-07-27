const { SlashCommandBuilder } = require("discord.js");
const translation = require("../../../handlers/translate/translation");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const config = require("../../../config");
const defaultTranslationLanguage = config.defaultTranslationLanguage;
const translations = loadLanguage(13);

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
            name: translations.firstOptionChoices.add.name,
            name_localizations:
              translations.firstOptionChoices.add.name_localizations,
            value: "add",
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
          }
        )
    ),
  run: async (client, interaction) => {
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    const content = await translation(interaction.locale, 13, client);
    const addBot = require("../../../handlers/watchbot/addBot");
    const listBot = require("../../../handlers/watchbot/listBot");
    const delBot = require("../../../handlers/watchbot/delBot");
    const action = interaction.options.getString(
      translations.firstOptionNames[defaultTranslationLanguage]
    );
    if (action === "add") addBot(client, interaction);
    if (action === "list") listBot(client, interaction);
    if (action === "delete") delBot(client, interaction);
  },
};
