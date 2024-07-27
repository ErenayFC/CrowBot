const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Colors } = require("discord.js");
const translation = require("../../../handlers/translate/translation");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const translations = loadLanguage(3);
const db = require("erenaydb");
const config = require("../../../config");
const defaultTranslationLanguage = config.defaultTranslationLanguage;

module.exports = {
  data: new SlashCommandBuilder()
    .setName(translations.names[defaultTranslationLanguage])
    .setDescription(translations.descriptions[defaultTranslationLanguage])
    .setNameLocalizations(translations.names)
    .setDescriptionLocalizations(translations.descriptions)
    .addStringOption((option) =>
      option
        .setName(translations.firstOptionNames[defaultTranslationLanguage])
        .setDescription(translations.firstOptionDescriptions[defaultTranslationLanguage])
        .setNameLocalizations(translations.firstOptionNames)
        .setDescriptionLocalizations(translations.firstOptionDescriptions)
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    await interaction.deferReply({ ephemeral: true });
    const translate = await translation(interaction.locale, 3, client);

    const Sahip = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.avatarURL(),
      })
      .setDescription(`${translate.fail}`)
      .setFooter({
        text: translate.sponsor,
        iconURL: config.sponsor.image,
      });
    if (!config.ownerIDs.includes(interaction.user.id))
      return await interaction.followUp({ embeds: [Sahip] });

    const kod = interaction.options.getString(
      translations.firstOptionNames[defaultTranslationLanguage]
    );
    try {
      const evaled = await clean(await eval(kod));
      if (evaled.match(new RegExp(`${client.token}`, "g")));
      const Token = new EmbedBuilder()
        .setDescription(`Bu şekilde token alınamaz xd.`)
        .setColor(Colors.Red)
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.avatarURL(),
        })
        .setFooter({
          text: translate.sponsor,
          iconURL: config.sponsor.image,
        });
      if (evaled.includes(client.token))
        return await interaction.followUp({ embeds: [Token] });

      if (evaled.match(new RegExp(`${client.token}`, "g")));
      if (evaled.includes("fs"))
        return await interaction.followUp({ embeds: [Dosya] });
      const Eval = new EmbedBuilder()
        .addFields({
          name: `Kod girişi`,
          value: `\`${kod.substring(0, 1024)}\``,
        })
        .addFields({
          name: `Kod çıkışı`,
          value: `\`${evaled.substring(0, 1024)}\``,
        })
        .setColor(Colors.Green)
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.avatarURL(),
        })
        .setFooter({
          text: translate.sponsor,
          iconURL: config.sponsor.image,
        });
      await interaction.followUp({ embeds: [Eval] });
    } catch (err) {
      console.error(err.stackTrace || err);
      const Hata = new EmbedBuilder()
        .addFields({
          name: `Kod girişi`,
          value: `\`${kod.substring(0, 1024)}\``,
        })
        .addFields({ name: `Hata`, value: `\`${err}\`` })
        .setColor(Colors.Red)
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.avatarURL(),
        })
        .setFooter({
          text: translate.sponsor,
          iconURL: config.sponsor.image,
        });
      await interaction.followUp({ embeds: [Hata] });
    }
    async function clean(text) {
      if (typeof text !== "string") {
        text = require("util").inspect(text, { depth: 0 });
      }
      text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
      return text;
    }
  },
};
