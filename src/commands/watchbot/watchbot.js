const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("watchbot")
    .setDescription("Botunuzu izletirsiniz.")
    .addSubcommand((subcommand) =>
      subcommand.setName("ekle").setDescription("Bot Ekle")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("liste").setDescription("Bot Liste")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("sil").setDescription("Bot Sil")
    ),
  run: async (client, interaction) => {
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    const addBot = require("../../../handlers/watchbot/addBot");
    const listBot = require("../../../handlers/watchbot/listBot");
    const delBot = require("../../../handlers/watchbot/delBot");
    const subCommand = interaction.options.getSubcommand();
    if (subCommand == "ekle") addBot(client, interaction);
    if (subCommand == "liste") listBot(client, interaction);
    if (subCommand == "sil") delBot(client, interaction);
  },
};
