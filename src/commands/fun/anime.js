const { NekosAPI } = require("nekosapi");
const nekos = new NekosAPI();
const {
  SlashCommandBuilder,
  AttachmentBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const translation = require("../../../handlers/translate/translation");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const config = require("../../../config");
const defaultTranslationLanguage = config.defaultTranslationLanguage;
const translations = loadLanguage(7);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(translations.names[defaultTranslationLanguage])
    .setDescription(translations.descriptions[defaultTranslationLanguage])
    .setNameLocalizations(translations.names)
    .setDescriptionLocalizations(translations.descriptions)
    .addBooleanOption((option) =>
      option
        .setName(translations.firstOptionNames[defaultTranslationLanguage])
        .setDescription(
          translations.firstOptionDescriptions[defaultTranslationLanguage]
        )
        .setNameLocalizations(translations.firstOptionNames)
        .setDescriptionLocalizations(translations.firstOptionDescriptions)
    ),
  run: async (client, interaction) => {
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    await interaction.deferReply({ ephemeral: true });
    const content = await translation(interaction.locale, 7, client);
    const isNSFW = interaction.options.getBoolean(
      translations.firstOptionNames[defaultTranslationLanguage]
    );
    //const channelIsNSFW = interaction.channel.nsfw;
    /*if (isNSFW && !channelIsNSFW)
      return interaction
        .followUp({ content: content.isNotNSFWChannel })
        .catch((e) => {});*/
    const NSFWTags = ["Exposed anus", "Exposed girl breasts", "Anal", "Pussy"];
    const safeTags = [
      "Girl",
      "Kissing",
      "Boy",
      "Catgirl",
      "Blue Hair",
      "Pink hair",
      "Purple hair",
      "Blonde hair",
      "Black hair",
      "White hair",
      "Brown Hair",
      "Red hair",
    ];
    const image = await nekos.getRandomImage(
      isNSFW
        ? NSFWTags[Math.floor(Math.random() * NSFWTags.length)]
        : safeTags[Math.floor(Math.random() * safeTags.length)],
      {
        rating: isNSFW ? "borderline" : "safe",
      }
    );
    const attachment = new AttachmentBuilder(image.image_url, {
      name: "anime.png",
    });
    const embed = new EmbedBuilder()
      .setTitle(content.image)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.avatarURL(),
      })
      .setImage("attachment://anime.png")
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
