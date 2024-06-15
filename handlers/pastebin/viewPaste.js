const { EmbedBuilder } = require("discord.js");
const db = require("erenaydb");

module.exports = async (client, interaction) => {
  await interaction.deferReply({
    ephemeral: interaction.options.getBoolean("gizli"),
  });
  const PasteNotFound = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(
      `<:Carpi:1046504575277998130> **Böyle bir Herkese Açık Koda sahip bir Paste bulunmuyor**`
    );
  const allPastes = await db.fetch(`pastes`);
  const foundedPaste = allPastes.find(
    (paste) => paste.publicCode === interaction.options.getString("kod")
  ).content;
  if (foundedPaste) {
    const PasteContent = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Başarılı")
      .setDescription("```" + foundedPaste + "```");
    interaction.followUp({ embeds: [PasteContent] }).catch((e) => {});
  } else {
    interaction.followUp({ embeds: [PasteNotFound] }).catch((e) => {});
  }
};
