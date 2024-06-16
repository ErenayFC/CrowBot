const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  Colors,
} = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
  shards: "auto",
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember,
  ],
});
const { token, kanallar, mongoURI } = require("./config.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const db = require("erenaydb");
const fs = require("fs");
const botEkle = require("./handlers/watchbot/botEkle");
const pasteEkle = require("./handlers/pastebin/pasteEkle");
const Konsol = require("./functions/beautifulConsole.js");
const konsol = new Konsol();
const log = konsol.log;
const error = konsol.error;
db.setAdapter("mongo", {
  url: mongoURI,
});

client.commands = new Collection();
client.commandsJSON = new Collection();

const slashCommandsRegister = () => {
  const commandFolders = fs
    .readdirSync("./src/commands", { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./src/commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`./src/commands/${folder}/${file}`);
      client.commandsJSON.set(
        command.data.toJSON().name,
        command.data.toJSON()
      );
      client.commands.set(command.data.toJSON().name, command);
    }
  }
  client.on("ready", async () => {
    try {
      const rest = new REST({ version: "10" }).setToken(token);
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: client.commandsJSON,
      });
      log(
        `${client.user.username}, ${client.commands.size} Komut ile birlikte Aktif Edildi!`
      );
    } catch (e) {
      error(e);
    }
  });
};
slashCommandsRegister();
//event-handler
const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
client.on("error", console.error);
client.on("shardError", console.error);
client.on("shardDisconnect", console.error);
client.on("warn", console.error);
process.on("unhandledRejection", (error) => {
  console.log("Error > ", error);
  if (!client.channels.cache.get(kanallar.hatalog)) return;
  const Hata = new EmbedBuilder()
    .setColor(Colors.Red)
    .setDescription(`> Bot bir hata verdi.\n\n> \`${error.stack}\``)
    .setTimestamp();
  client.channels.cache.get(kanallar.hatalog).send({ embeds: [Hata] });
});
process.on("uncaughtException", (error) => {
  console.log("Error > ", error);
  if (!client.channels.cache.get(kanallar.hatalog)) return;
  const Hata2 = new EmbedBuilder()
    .setColor(Colors.Red)
    .setDescription(`> Bot bir hata verdi.\n\n> \`${error.stack}\``)
    .setTimestamp();
  client.channels.cache.get(kanallar.hatalog).send({ embeds: [Hata2] });
});
process.on("uncaughtExceptionMonitor", (error) => {
  console.log("Error > ", error);
  if (!client.channels.cache.get(kanallar.hatalog)) return;
  const Hata3 = new EmbedBuilder()
    .setColor(Colors.Red)
    .setDescription(`> Bot bir hata verdi.\n\n> \`${error.stack}\``)
    .setTimestamp();
  client.channels.cache.get(kanallar.hatalog).send({ embeds: [Hata3] });
});
process.on("rejectionHandled", (error) => {
  console.log(error);
  if (!client.channels.cache.get(kanallar.hatalog)) return;
  const Hata4 = new EmbedBuilder()
    .setColor(Colors.Red)
    .setDescription(`> Bot bir hata verdi.\n\n> \`${error.stack}\``)
    .setTimestamp();
  client.channels.cache.get(kanallar.hatalog).send({ embeds: [Hata4] });
});
client.login(token);

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId == "boteklemeform") {
    await botEkle(client, interaction);
  }
  if (interaction.customId == "pasteoluşturmaform") {
    await pasteEkle(client, interaction);
  }
});

client.once("ready", () => {
  (async () => {
    require("./dashboard/index")(client);
    const checkWatch = require("./handlers/watchbot/watchBots.js");
    let botlar = (await db.fetch("botlar")) || [];
    setInterval(async () => {
      if (botlar.length > 0) {
        botlar = await db.fetch("botlar");
        await checkWatch(botlar, client);
      }
    }, 5 * 1000);
  })();
});
