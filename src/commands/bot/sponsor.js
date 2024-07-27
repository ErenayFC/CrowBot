const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const { sponsor, defaultTranslationLanguage } = require("../../../config");
const translations = loadLanguage(12);

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

    const embed = new EmbedBuilder()
      .setTitle(sponsor.name)
      .setURL(sponsor.link)
      .setAuthor({ iconURL: sponsor.image, name: sponsor.name })
      .setDescription(sponsor.description)
      .setThumbnail(sponsor.image)
      .setImage(sponsor.banner)
      .setColor("LightGrey")
      .setFooter({ text: sponsor.discordUrl });

    return interaction.reply({
      embeds: [embed],
      components: [
        new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setLabel(sponsor.buttonWebSiteName)
              .setStyle(ButtonStyle.Link)
              .setURL(sponsor.link)
          )
          .addComponents(
            new ButtonBuilder()
              .setLabel(sponsor.buttonDiscordServerName)
              .setStyle(ButtonStyle.Link)
              .setURL(sponsor.discordUrl)
          ),
      ],
    });
  },
};
