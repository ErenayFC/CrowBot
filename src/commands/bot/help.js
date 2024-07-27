const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const translation = require("../../../handlers/translate/translation");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const config = require("../../../config");
const defaultTranslationLanguage = config.defaultTranslationLanguage;
const translations = loadLanguage(1);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(translations.names[defaultTranslationLanguage])
    .setDescription(translations.descriptions[defaultTranslationLanguage])
    .setNameLocalizations(translations.names)
    .setDescriptionLocalizations(translations.descriptions),
  run: async (client, interaction) => {
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    const content = await translation(interaction.locale, 1, client);
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(content.title)
      .setDescription(content.description)
      .addFields(
        { name: content.aiCommands, value: content.aiCommandsList },
        { name: content.botCommands, value: content.botCommandsList },
        { name: content.funCommands, value: content.funCommandsList },
        { name: content.ownerCommands, value: content.ownerCommandsList },
        { name: content.pastebinCommands, value: content.pastebinCommandsList },
        { name: content.watchbotCommands, value: content.watchbotCommandsList }
      )
      .setFooter({ text: content.sponsor, iconURL: config.sponsor.image });

    interaction.reply({
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel(config.sponsor.buttonWebSiteName)
            .setStyle(ButtonStyle.Link)
            .setURL(config.sponsor.link)
        ),
      ],
    });
  },
};