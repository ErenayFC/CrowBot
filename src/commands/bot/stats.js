const {
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const translation = require("../../../handlers/translate/translation");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const osu = require("os-utils");
const os = require("os");
const config = require("../../../config");
const defaultTranslationLanguage = config.defaultTranslationLanguage;
const translations = loadLanguage(2);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(translations.names[defaultTranslationLanguage])
    .setDescription(translations.descriptions[defaultTranslationLanguage])
    .setNameLocalizations(translations.names)
    .setDescriptionLocalizations(translations.descriptions),
  run: async (client, interaction) => {
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    await interaction.deferReply();
    const content = await translation(interaction.locale, 2, client);
    const uptime = Date.now() - client.uptime;
    const totalMemory = os.totalmem();
    const usedMemory = process.memoryUsage().heapUsed;
    const memoryUsagePercent = (usedMemory / totalMemory) * 100;

    osu.cpuUsage(async (cpuUsage) => {
      const embed = new EmbedBuilder()
        .setURL()
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
            name: content.uptime,
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
            value:
              `${(cpuUsage * 100).toFixed(2)}%`,
            inline: true,
          },
          {
            name: content.botVersion,
            value: `v${require("../../../package.json").version}`,
            inline: true,
          },
          {
            name: content.shardCount,
            value: `${client.options.shardCount || 1}`,
            inline: true,
          },
          {
            name: content.owner,
            value: "[erenay_09](https://discord.com/users/1029431477219360869)",
            inline: true,
          }
        )
        .setColor("#5865F2")
        .setFooter({
          text: content.sponsor,
          iconURL: config.sponsor.image,
        });

      await interaction.editReply({
        embeds: [embed],
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setLabel(config.sponsor.buttonWebSiteName)
              .setStyle(ButtonStyle.Link)
              .setURL(config.sponsor.link)
          ),
        ],
      });
    });
  },
};
