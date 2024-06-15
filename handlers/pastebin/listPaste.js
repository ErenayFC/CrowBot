const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js");
const db = require("erenaydb");

module.exports = async (client, interaction) => {
  await interaction.deferReply({ ephemeral: true });
  const PasteEklenmemiş = new Discord.EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(
      `**Maalesef şuanda sistemde sana ait olan hiçbir paste yok. </pastebin oluştur:786466522972946462> yazarak bir paste oluşturmaya ne dersin?**`
    );
  const userPastes = await db.fetch(`paste_${interaction.user.id}`);
  if (!userPastes || !userPastes.length)
    return interaction
      .followUp({ embeds: [PasteEklenmemiş], ephemeral: true })
      .catch((e) => {});

  const links = await Promise.all(
    userPastes.map(async (map, index) => {
      return `<:paste:1230414766070042624> **Paste ${index + 1}:** ${
        map.content.length < 15
          ? map.content
          : map.content.substring(0, 15) + "..."
      } - ${map.publicCode}`;
    })
  );

  const PasteListe = new EmbedBuilder()
    .setTitle(`PasteBin Sistemi - Liste`)
    .setDescription(`${links.join("\n")}`)
    .setColor("Blurple");

  interaction
    .followUp({
      embeds: [PasteListe],
    })
    .catch((e) => {});
};
