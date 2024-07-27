const { EmbedBuilder } = require("discord.js");
const { kanallar } = require("../../config");

module.exports = {
  name: "guildCreate",
  once: false,
  execute: async (client, guild) => {
    const embed = new EmbedBuilder()
      .setTitle("Yeni bir sunucuya eklendim")
      .setThumbnail(guild.iconURL() || client.user.avatarURL())
      .addFields(
        { name: "Ad", value: String(guild.name) },
        { name: "ID", value: String(guild.id) },
        { name: "Owner", value: `<@${guild.ownerId}>` },
        { name: "Owner ID", value: String(guild.ownerId) }
      )
      .setColor("Green");
    const channel = client.channels.cache.get(kanallar.eklendimatildim);
    channel.send({ embeds: [embed] });
  },
};
