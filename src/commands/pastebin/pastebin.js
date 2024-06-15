const { SlashCommandBuilder } = require("discord.js");

const createPaste = require("../../../handlers/pastebin/createPaste.js");
const listPaste = require("../../../handlers/pastebin/listPaste.js");
const delPaste = require("../../../handlers/pastebin/deletePaste.js");
const viewPaste = require("../../../handlers/pastebin/viewPaste.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pastebin")
    .setDescription("Pastebin sistemini kullanırsınız.")
    .addSubcommand((subcommand) =>
      subcommand.setName("oluştur").setDescription("Paste Oluştur")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("liste").setDescription("Paste'lerini Listele")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("sil").setDescription("Paste Sil")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("görüntüle")
        .setDescription("Paste Görüntüle")
        .addStringOption((option) =>
          option
            .setName("kod")
            .setDescription(
              "Görüntülemek istediğiniz Paste'nin herkese açık kodunu girin"
            )
            .setRequired(true)
        )
        .addBooleanOption((option) =>
          option
            .setName("gizli")
            .setDescription("Mesajı yalnızca sana mı göndereyim?")
        )
    ),
  run: async (client, interaction) => {
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    const subCommand = interaction.options.getSubcommand();
    if (subCommand == "oluştur") createPaste(client, interaction);
    if (subCommand == "liste") listPaste(client, interaction);
    if (subCommand == "sil") delPaste(client, interaction);
    if (subCommand == "görüntüle") viewPaste(client, interaction);
  },
};
