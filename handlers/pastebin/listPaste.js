const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js");
const db = require("erenaydb");
const translation = require("../translate/translation");

module.exports = async (client, interaction) => {
  const content = await translation(interaction.locale, 14, client);
  
  await interaction.deferReply({ ephemeral: true });
  const PasteEklenmemiş = new Discord.EmbedBuilder()
    .setColor("Red")
    .setTitle(content.errorTitle)
    .setDescription(content.listPaste.noPasteFound);

  const userPastes = await db.fetch(`paste_${interaction.user.id}`);
  if (!userPastes || !userPastes.length)
    return interaction
      .followUp({ embeds: [PasteEklenmemiş], ephemeral: true })
      .catch((e) => {});

  const links = await Promise.all(
    userPastes.map(async (map, index) => {
      return `<:paste:1230414766070042624> ${content.listPaste.pasteLabel} ${index + 1}: ${
        map.content.length < 15
          ? map.content
          : map.content.substring(0, 15) + "..."
      } - ${map.publicCode}`;
    })
  );

  const PasteListe = new EmbedBuilder()
    .setTitle(content.listPaste.embedTitle)
    .setDescription(`${links.join("\n")}`)
    .setColor("Blurple");

  interaction
    .followUp({
      embeds: [PasteListe],
    })
    .catch((e) => {});
};