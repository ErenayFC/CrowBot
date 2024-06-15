const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = async (client, interaction) => {
  const PasteOluşturmeFormu = new ModalBuilder()
    .setCustomId("pasteoluşturmaform")
    .setTitle("Yeni Paste Oluştur");

  const PasteContent = new TextInputBuilder()
    .setCustomId("content")
    .setLabel("Bu kısıma gerekli içeriği yazınız")
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(5)
    .setPlaceholder("Merhaba!")
    .setRequired(true);
  const PasteOluşturmaSistemi = new ActionRowBuilder();
  PasteOluşturmaSistemi.addComponents(PasteContent);

  PasteOluşturmeFormu.addComponents(PasteOluşturmaSistemi);

  await interaction.showModal(PasteOluşturmeFormu);
};
