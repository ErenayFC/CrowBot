const { InteractionType } = require("discord.js");
const { readdirSync } = require("fs");
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
              command.run(client, interaction);
            }
          }
        }
      }
    } catch (e) {
      log(e);
    }
  },
};
