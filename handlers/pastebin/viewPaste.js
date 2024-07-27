const { EmbedBuilder } = require("discord.js");
const db = require("erenaydb");
const translation = require("../translate/translation");

module.exports = async (client, interaction) => {
  const content = await translation(interaction.locale, 14, client);

  await interaction.deferReply({
    ephemeral: interaction.options.getBoolean("gizli"),
  });
  const PasteNotFound = new EmbedBuilder()
    .setColor("Red")
    .setTitle(content.errorTitle)
    .setDescription(content.viewPaste.pasteNotFound);

  const allPastes = await db.fetch(`pastes`);
  const foundedPaste = allPastes.find(
    (paste) => paste.publicCode === interaction.options.getString("kod")
  );

  if (foundedPaste) {
    const PasteContent = new EmbedBuilder()
      .setColor("Green")
      .setTitle(content.viewPaste.successTitle)
      .setDescription("```" + foundedPaste.content + "```");
    interaction.followUp({ embeds: [PasteContent] }).catch((e) => {});
  } else {
    interaction.followUp({ embeds: [PasteNotFound] }).catch((e) => {});
  }
};