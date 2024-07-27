const {
  Client,
  WebhookClient,
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
const db = require("erenaydb");
const fs = require("fs");
const pasteEkle = require("./handlers/pastebin/pasteEkle");
db.setAdapter("mongo", {
  url: mongoURI,
});

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
const webhook = new WebhookClient({
  url: kanallar.hataLogWebhookURI,
});
process.on("unhandledRejection", (error) => {
  console.log("Error > ", error);
  if (!webhook) return;
  const Hata = new EmbedBuilder()
    .setColor(Colors.Red)
    .setDescription(`> Bot bir hata verdi.\n\n> \`${error.stack}\``)
    .setTimestamp();
  webhook.send({ embeds: [Hata] });
});
process.on("uncaughtException", (error) => {
  console.log("Error > ", error);
  if (!webhook) return;
  const Hata2 = new EmbedBuilder()
    .setColor(Colors.Red)
    .setDescription(`> Bot bir hata verdi.\n\n> \`${error.stack}\``)
    .setTimestamp();
  webhook.send({ embeds: [Hata2] });
});
process.on("uncaughtExceptionMonitor", (error) => {
  console.log("Error > ", error);
  if (!webhook) return;
  const Hata3 = new EmbedBuilder()
    .setColor(Colors.Red)
    .setDescription(`> Bot bir hata verdi.\n\n> \`${error.stack}\``)
    .setTimestamp();
  webhook.send({ embeds: [Hata3] });
});
process.on("rejectionHandled", (error) => {
  console.log(error);
  if (!webhook) return;
  const Hata4 = new EmbedBuilder()
    .setColor(Colors.Red)
    .setDescription(`> Bot bir hata verdi.\n\n> \`${error.stack}\``)
    .setTimestamp();
  webhook.send({ embeds: [Hata4] });
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId == "pasteoluşturmaform") {
    await pasteEkle(client, interaction);
  }
});

client.on("ready", () => {
  (async () => {
    require("./dashboard/index")(client);
    const checkWatch = require("./handlers/watchbot/watchBots.js");
    let botlar = (await db.fetch("botlar")) || [];
    setInterval(async () => {
      botlar = await db.fetch("botlar");
    }, 1 * 1000 * 60);
    setInterval(async () => {
      if (botlar.length > 0) {
        try {
          await checkWatch(botlar, client);
        } catch (err) {
          console.error(
            `Bir hata oluştu. Bot yeniden başlatılıyor...\n\n\n` + err
          );
          process.exit(1);
        }
      }
    }, 5 * 1000);
  })();
});

client.login(token);
