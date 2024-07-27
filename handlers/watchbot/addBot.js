const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
const config = require("../../config");
const translation = require("../translate/translation");

module.exports = async (client, interaction) => {
  const content = await translation(interaction.locale, 13, client);

  const embed = new EmbedBuilder()
    .setDescription(content.addBot.description)
    .setColor("Red")
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.avatarURL(),
    })
    .setFooter({
      text: content.sponsor,
      iconURL: config.sponsor.image
    })
  await interaction.reply({
    embeds: [embed], components: [
      new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL('https://crowbot.com.tr/')
            .setLabel(content.addBot.goToWebSite)
      )
  ]});
};