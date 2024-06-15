const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const hf = require("@huggingface/inference");
const config = require('../../../config.js');
const translations = loadLanguage(5);

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
    await interaction.deferReply();

    async function chat(text) {
      const out = await hf.chatCompletion({
        accessToken: config.huggingFaceAccessToken,
        model: "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
        messages: [
          {
            role: "system",
            content: `Your name is Crow. You are a Discord bot(not an animal). Speak user's language. write your message briefly and concisely.`,
          },
          { role: "user", content: `${text}` },
        ],
        max_tokens: 4096,
        temperature: 0.3,
      });
      return out.choices[0].message.content;
    }

    const content = await chat(
      interaction.options.getString(translations.firstOptionNames["en-US"])
    );
    const embed = new EmbedBuilder()
      .setTitle("Crow")
      .setColor("DarkVividPink")
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.avatarURL(),
      })
      .setFooter({
        text: client.user.username,
        iconURL: client.user.avatarURL(),
      })
      .setTimestamp()
      .setDescription(content.substring(0, 4096));
    interaction.followUp({ embeds: [embed] });
  },
};
