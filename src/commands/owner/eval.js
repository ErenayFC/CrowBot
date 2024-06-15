const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Colors } = require("discord.js");
const translation = require("../../../handlers/translate/translation");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const translations = loadLanguage(3);
const db = require("erenaydb");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(translations.names["en-US"])
    .setDescription(translations.descriptions["en-US"])
    .setNameLocalizations(translations.names)
    .setDescriptionLocalizations(translations.descriptions)
    .addStringOption((option) =>
      option
        .setName(translations.firstOptionNames["en-US"])
        .setDescription(translations.firstOptionDescriptions["en-US"])
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
    const translate = await translation(interaction.locale, 3);

    const Sahip = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.avatarURL(),
      })
      .setDescription(`${translate.fail}`)
      .setFooter({
        text: client.user.username,
        iconURL: client.user.avatarURL(),
      })
      .setTimestamp();
    if (interaction.user.id !== "1029431477219360869")
      return await interaction.followUp({ embeds: [Sahip] });

    const kod = interaction.options.getString(
      translations.firstOptionNames["en-US"]
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
          text: client.user.username,
          iconURL: client.user.avatarURL(),
        })
        .setTimestamp();
      if (evaled.includes(client.token))
        return await interaction.followUp({ embeds: [Token] });

      if (evaled.match(new RegExp(`${client.token}`, "g")));
      if (evaled.includes("fs"))
        return await interaction.followUp({ embeds: [Dosya] });
      const Eval = new EmbedBuilder()
        .addFields({ name: `Kod girişi`, value: `\`${kod}\`` })
        .addFields({
          name: `Kod çıkışı`,
          value: `\`${evaled}\``,
        })
        .setColor(Colors.Green)
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.avatarURL(),
        })
        .setFooter({
          text: client.user.username,
          iconURL: client.user.avatarURL(),
        })
        .setTimestamp();
      await interaction.followUp({ embeds: [Eval] });
    } catch (err) {
      console.error(err.stackTrace || err);
      const Hata = new EmbedBuilder()
        .addFields({ name: `Kod girişi`, value: `\`${kod}\`` })
        .addFields({ name: `Hata`, value: `\`${err}\`` })
        .setColor(Colors.Red)
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.avatarURL(),
        })
        .setFooter({
          text: client.user.username,
          iconURL: client.user.avatarURL(),
        })
        .setTimestamp();
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
