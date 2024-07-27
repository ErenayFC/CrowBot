const {
  SlashCommandBuilder,
  AttachmentBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const translation = require("../../../handlers/translate/translation");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const axios = require("axios");
const config = require("../../../config");
const defaultTranslationLanguage = config.defaultTranslationLanguage;
const translations = loadLanguage(9);

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
    await interaction.deferReply({ ephemeral: true });
    const content = await translation(interaction.locale, 9, client);
    const image = await axios.get("https://pic.re/image.json");

    const attachment = new AttachmentBuilder(`https://${image.data.file_url}`, {
      name: "wallpaper.png",
    });
    const embed = new EmbedBuilder()
      .setTitle(content.image)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.avatarURL(),
      })
      .setImage("attachment://wallpaper.png")
      .setColor("DarkVividPink")
      .setFooter({
        text:
          "Sponsor: " + config.sponsor.name + " (" + config.sponsor.link + ")",
        iconURL: config.sponsor.image,
      })
      .setTimestamp();
    return interaction.followUp({
      embeds: [embed],
      files: [attachment],
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
