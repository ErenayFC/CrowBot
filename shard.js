const path = require("path");
const { EmbedBuilder, WebhookClient, ShardingManager } = require("discord.js");
const config = require("./config");
const Konsol = require("./functions/beautifulConsole");
const konsol = new Konsol();
const webhook = new WebhookClient({
  url: config.shardWebhookURL,
});

const manager = new ShardingManager(path.join(__dirname, "index.js"), {
  totalShards: "auto",
  token: config.token,
});

manager.on("shardCreate", async (shard) => {
  shard.on("ready", async () => {
    konsol.log(
      `${shard.id} numaralı shard başarıyla çalıştırıldı!`,
      `SHARD ${shard.id}`,
      {
        hex: "#32d124",
        timeout: 5000,
      }
    );
    webhook.send({
      embeds: [
        new EmbedBuilder()
          .setColor("Green")
          .setDescription(
            `\`#${shard.id}\` - ID'li shard başarıyla başlatıldı`
          ),
      ],
    });
  });
  shard.on("reconnecting", async () => {
    konsol.log(
      `${shard.id} numaralı shard yeniden başlatıldı!`,
      `SHARD ${shard.id}`,
      {
        hex: "#FFB02F",
        timeout: 5000,
      }
    );

    webhook.send({
      embeds: [
        new EmbedBuilder()
          .setColor("Blue")
          .setDescription(
            `\`#${shard.id}\` - ID'li shard yeniden başlatılıyor`
          ),
      ],
    });
  });
  shard.on("death", async () => {
    konsol.error(
      `${shard.id} numaralı shard çöktü, yeniden başlatılıyor!`,
      "ERROR",
      {
        timeout: 1000,
      }
    );
    const death = new EmbedBuilder()
      .setColor("Blue")
      .setDescription(
        `\`#${shard.id}\` - ID'li shard çöktü, yeniden başlatılıyor`
      );
    webhook.send({ embeds: [death] });
  });
  shard.on("disconnect", async () => {
    konsol.error(
      `${shard.id} numaralı shard çöktü, yeniden başlatılıyor!`,
      "ERROR",
      {
        timeout: 1000,
      }
    );

    const disconnect = new EmbedBuilder()
      .setColor("Red")
      .setDescription(`\`#${shard.id}\` - ID'li shard yeniden başlatılıyor`);
    webhook.send({ embeds: [disconnect] });
  });
  shard.on("error", async () => {
    konsol.error(`${shard.id} numaralı shard hatalı!`, "ERROR", {
      timeout: 1000,
    });

    const error = new EmbedBuilder()
      .setColor("DarkAqua")
      .setDescription(`\`#${shard.id}\` - ID'li shard hatalı`);
    webhook.send({ embeds: [error] });
  });
});

manager.spawn();
