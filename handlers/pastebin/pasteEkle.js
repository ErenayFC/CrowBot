const { EmbedBuilder } = require("discord.js");
const db = require("erenaydb");

module.exports = async (client, interaction) => {
  const generatedCode = generateCode();
  const PasteEklendi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Başarılı")
    .setDescription(
      `<:Tik:1046504590775947274> **Pasteniz başarıyla sisteme eklendi. Bizi tercih ettiğiniz için teşekkür ederiz.\n- İşte Herkese Açık PasteBin Kodun: ${generatedCode}**`
    );

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
