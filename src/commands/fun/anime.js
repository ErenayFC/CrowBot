const { NekosAPI } = require("nekosapi");
const nekos = new NekosAPI();
const {
  SlashCommandBuilder,
  AttachmentBuilder,
  EmbedBuilder,
} = require("discord.js");
const translation = require("../../../handlers/translate/translation");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const translations = loadLanguage(7);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(translations.names["en-US"])
    .setDescription(translations.descriptions["en-US"])
    .setNameLocalizations(translations.names)
    .setDescriptionLocalizations(translations.descriptions)
    .addBooleanOption((option) =>
      option
        .setName(translations.firstOptionNames["en-US"])
        .setDescription(translations.firstOptionDescriptions["en-US"])
        .setNameLocalizations(translations.firstOptionNames)
        .setDescriptionLocalizations(translations.firstOptionDescriptions)
    ),
  run: async (client, interaction) => {
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    await interaction.deferReply({ ephemeral: true });
    const content = await translation(interaction.locale, 7);
    const isNSFW = interaction.options.getBoolean(
      translations.firstOptionNames["en-US"]
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
        text: client.user.username,
        iconURL: client.user.avatarURL(),
      })
      .setTimestamp();
    return interaction.followUp({ embeds: [embed], files: [attachment] });
  },
};
