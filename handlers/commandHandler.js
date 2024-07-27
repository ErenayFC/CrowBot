const { Collection, REST, Routes } = require("discord.js");
const { CLIENT_ID, token } = require("../config.js");
const fs = require("node:fs");
const path = require("node:path");
const Konsol = require("../functions/beautifulConsole.js");

const konsol = new Konsol();
const log = konsol.log;
const error = konsol.error;

const commands = new Collection();
const commandsJSON = [];

const foldersPath = path.join(__dirname, "..", "src", "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "run" in command) {
      commands.set(command.data.name, command);
      commandsJSON.push(command.data.toJSON());
    } else {
      log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "run" property.`
      );
    }
  }
}

const rest = new REST().setToken(token);

const deployCommands = async () => {
  try {
    log(`Started refreshing ${commandsJSON.length} application (/) commands.`);

    const data = await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commandsJSON,
    });

    log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (err) {
    error(err);
  }
};
const watchCommands = () => {
  let timeout;
  const delay = 3 * 1000;

  fs.watch(foldersPath, { recursive: true }, (eventType, filename) => {
      if (filename && filename.endsWith('.js')) {
          log(`Command file changed: ${filename}`);
          
          if (timeout) {
              clearTimeout(timeout);
          }

          timeout = setTimeout(() => {
              commands.clear();
              commandsJSON.length = 0;
              for (const folder of commandFolders) {
                  const commandsPath = path.join(foldersPath, folder);
                  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
                  
                  for (const file of commandFiles) {
                      const filePath = path.join(commandsPath, file);
                      delete require.cache[require.resolve(filePath)];
                      const command = require(filePath);
                      if ('data' in command && 'run' in command) {
                          commands.set(command.data.name, command);
                          commandsJSON.push(command.data.toJSON());
                      } else {
                          log(`[WARNING] The command at ${filePath} is missing a required "data" or "run" property.`);
                      }
                  }
              }
              log("Deploying commands after 3 seconds of inactivity...");
              deployCommands();
          }, delay);
      }
  });
};

deployCommands();
watchCommands();

module.exports = { commands, commandsJSON };
