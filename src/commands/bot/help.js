const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const translation = require("../../../handlers/translate/translation");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const translations = loadLanguage(1);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(translations.names["en-US"])
    .setDescription(translations.descriptions["en-US"])
    .setNameLocalizations(translations.names)
    .setDescriptionLocalizations(translations.descriptions),
  run: async (client, interaction) => {
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    const content = await translation(interaction.locale, 1);
    const embed = new EmbedBuilder()
      .setTitle("Crow")
      .setDescription(`
      - \`/watchbot\` : ${content.watchbot}
       - ${content.watchbotHelp}
      - \`/pastebin\` : ${content.pastebin}
      `)
      .setColor('Gold')
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.avatarURL(),
      })
      .setFooter({
        text: client.user.username,
        iconURL: client.user.avatarURL(),
      })
      .setTimestamp()

    interaction.reply({ embeds: [embed] });
  },
};
