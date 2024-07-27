const { EmbedBuilder } = require("discord.js");
const db = require("erenaydb");
const translation = require("../translate/translation");

module.exports = async (client, interaction) => {
  const content = await translation(interaction.locale, 14, client);

  const generatedCode = generateCode();
  const PasteEklendi = new EmbedBuilder()
    .setColor("Green")
    .setTitle(content.createPaste.successTitle)
    .setDescription(content.createPaste.publicCode(generatedCode));

  const pasteContent = await interaction.fields.getTextInputValue("content");
  db.push(`paste_${interaction.user.id}`, {
    content: pasteContent,
    publicCode: generatedCode,
    owner: interaction.user.id,
  });
  db.add(`pastesayısı_${interaction.user.id}`, 1);
  db.push("pastes", {
    content: pasteContent,
    publicCode: generatedCode,
    owner: interaction.user.id,
  });
  interaction
    .reply({ embeds: [PasteEklendi], ephemeral: true })
    .catch((e) => {});
};

function generateCode(length = 10) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}