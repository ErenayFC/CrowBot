const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");
const translation = require("../translate/translation");

module.exports = async (client, interaction) => {
  const content = await translation(interaction.locale, 14, client);

  const PasteOluşturmeFormu = new ModalBuilder()
    .setCustomId("pasteoluşturmaform")
    .setTitle(content.createPaste.modalTitle);

  const PasteContent = new TextInputBuilder()
    .setCustomId("content")
    .setLabel(content.createPaste.contentLabel)
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(5)
    .setPlaceholder(content.createPaste.contentPlaceholder)
    .setRequired(true);
  const PasteOluşturmaSistemi = new ActionRowBuilder();
  PasteOluşturmaSistemi.addComponents(PasteContent);

  PasteOluşturmeFormu.addComponents(PasteOluşturmaSistemi);

  await interaction.showModal(PasteOluşturmeFormu);
};