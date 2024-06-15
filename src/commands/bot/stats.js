const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const translation = require("../../../handlers/translate/translation");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const osu = require("os-utils");
const translations = loadLanguage(2);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(translations.names["en-US"])
    .setDescription(translations.descriptions["en-US"])
    .setNameLocalizations(translations.names)
    .setDescriptionLocalizations(translations.descriptions),
  run: async (client, interaction) => {
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    await interaction.deferReply();
    const content = await translation(interaction.locale, 2);
    const uptime = Date.now() - client.uptime;
    const memoryUsage = process.memoryUsage();

    const totalMemory =
      memoryUsage.heapTotal + memoryUsage.external + memoryUsage.rss;
    const usedMemory =
      memoryUsage.heapUsed + memoryUsage.external + memoryUsage.rss;
    const memoryUsagePercent = (usedMemory / totalMemory) * 100;

    osu.cpuUsage(async (cpuUsage) => {
      const embed = new EmbedBuilder()
        .setTitle(content.title)
        .addFields(
          {
            name: content.serverCount,
            value: `${client.guilds.cache.size}`,
            inline: true,
          },
          {
            name: content.userCount,
            value: `${client.guilds.cache
              .reduce((a, b) => a + b.memberCount, 0)
              .toLocaleString()}`,
            inline: true,
          },
          {
            name: "Uptime",
            value: `<t:${Math.floor(uptime / 1000)}:R>`,
            inline: true,
          },
          { name: content.botPing, value: `${client.ws.ping}ms`, inline: true },
          {
            name: content.ramUsage,
            value: `${memoryUsagePercent.toFixed(2)}%`,
            inline: true,
          },
          {
            name: content.cpuUsage,
            value: `${(cpuUsage * 100).toFixed(2)}%`,
            inline: true,
          },
          {
            name: content.botVersion,
            value: `v${require("../../../package.json").version}`,
            inline: true,
          },
          {
            name: content.nodejsVersion,
            value: `${process.version}`,
            inline: true,
          },
          {
            name: content.shardCount,
            value: `${client.options.shardCount || 1}`,
            inline: true,
          }
        )
        .setColor("#5865F2")
        .setTimestamp()
        .setFooter({
          text: content.footer,
        });

      await interaction.editReply({ embeds: [embed] });
    });
  },
};
