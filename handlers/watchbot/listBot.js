const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js");
const db = require("erenaydb");

module.exports = async (client, interaction) => {
  await interaction.deferReply({ ephemeral: true });
  const ProjeEklenmemiş = new Discord.EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(
      `**Maalesef şuanda sistemde sana ait olan hiçbir bot yok. </watchbot ekle:786466522972946462> yazarak bir bot eklemeye ne dersin?**`
    );

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
      return `<:harenLink:1183081738843463770> **Bot ${
        index + 1
      }:** ${botName} - <#${map.channelId}>`;
    })
  );

  const LinkListe = new EmbedBuilder()
    .setTitle(`WatchBot Sistemi - Liste`)
    .setDescription(`${links.join("\n")}`)
    .setColor("Blurple");

  interaction
    .followUp({
      embeds: [LinkListe],
    })
    .catch((e) => {});
};
