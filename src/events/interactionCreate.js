const { InteractionType, EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const { kanallar, sponsor } = require("../../config");
const db = require("erenaydb");
const commandFiles = readdirSync("./src/commands", { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);
const Konsol = new require("../../functions/beautifulConsole.js");
const konsol = new Konsol();
const log = konsol.log;

module.exports = {
  name: "interactionCreate",
  execute: async (interaction) => {
    try {
      if (interaction.type === InteractionType.ApplicationCommand) {
        let client = interaction.client;
        if (interaction.user.bot) return;
        for (const folder of commandFiles) {
          const commandFiles = readdirSync(`./src/commands/${folder}`).filter(
            (file) => file.endsWith(".js")
          );
          for (const file of commandFiles) {
            const command = require(`../../src/commands/${folder}/${file}`);
            if (
              interaction.commandName.toLowerCase() ===
              command.data.name.toLowerCase()
            ) {
              await command.run(client, interaction);
              const embed = new EmbedBuilder()
                .setAuthor({
                  name: interaction.user.username,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setTitle("Komut Kullanıldı")
                .addFields(
                  { name: `Komut`, value: `/${interaction.commandName}` },
                  { name: `Sunucu`, value: interaction.guild.name ?? "DM" }
                )
                .setColor("DarkGold")
                .setTimestamp();
              await db.set(
                `userLanguage_${interaction.user.id}`,
                interaction.locale
              );
              client.channels.cache
                .get(kanallar.komutlog)
                .send({ embeds: [embed] });
            }
          }
        }
      }
    } catch (e) {
      log(e.stack);
    }
  },
};
