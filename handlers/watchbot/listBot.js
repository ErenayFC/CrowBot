const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js");
const db = require("erenaydb");
const translation = require("../translate/translation");

module.exports = async (client, interaction) => {
  const content = await translation(interaction.locale, 13, client);

  await interaction.deferReply({ ephemeral: true });
  const ProjeEklenmemiş = new Discord.EmbedBuilder()
    .setColor("Red")
    .setTitle(content.listBot.errorTitle)
    .setDescription(content.listBot.noBotFound);

  async function getBotName(id) {
    const bot = await client.users.fetch(id);
    return bot.username;
  }

  const userLinks = await db.fetch(`bot_${interaction.user.id}`);
  if (!userLinks || !userLinks.length)
    return interaction.followUp({ embeds: [ProjeEklenmemiş], ephemeral: true });

  const links = await Promise.all(
    userLinks.map(async (map, index) => {
      const botName = await getBotName(map.id);
      return `<:harenLink:1183081738843463770> **${content.listBot.botLabel} ${
        index + 1
      }:** ${botName} - <#${map.channelId}>`;
    })
  );

  const LinkListe = new EmbedBuilder()
    .setTitle(content.listBot.embedTitle)
    .setDescription(`${links.join("\n")}`)
    .setColor("Blurple");

  interaction
    .followUp({
      embeds: [LinkListe],
    })
    .catch((e) => {});
};