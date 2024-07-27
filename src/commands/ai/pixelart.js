const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");

const translation = require("../../../handlers/translate/translation");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const { getColorFromURL } = require("color-thief-node");
const { createCanvas, loadImage } = require("canvas");
const translations = loadLanguage(6);
const hf = require("@huggingface/inference");
const gtranslate = require("free-google-translate");
const LanguageDetect = require("languagedetect");
const lngDetector = new LanguageDetect();
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
    
    const content = await translation(interaction.locale, 4, client);
    await interaction.reply({
      content: `<a:loading_v2:1266683216442425407> ${content.generatingImage}...`,
      ephemeral: true
    });

    const prompt = interaction.options.getString(
      translations.firstOptionNames[defaultTranslationLanguage]
    );
    lngDetector.setLanguageType("iso2");
    const translator = new gtranslate(
      lngDetector.detect(prompt, 1)[0][0]/*interaction.locale*/,
      "en"
    );
    const translatedPrompt = await translator.translate(prompt);
    async function imagine(prompt) {
      const response = await hf.textToImage({
        inputs: `${prompt}, pixelartstyle`,
        accessToken: config.huggingFaceAccessToken,
        model: "nerijs/pixel-art-xl", //"kohbanye/pixel-art-style"
      });
      let buffer = Buffer.from(await response.arrayBuffer());
      return buffer;
    }

    try {
      const buffer = await imagine(translatedPrompt);
      const image = await loadImage(buffer);

      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, image.width, image.height);

      const finalBuffer = canvas.toBuffer();
      const attachment = new AttachmentBuilder(finalBuffer, {
        name: "image.png",
      });

      const dominantColor = await getColorFromURL(finalBuffer);
      const imageEmbed = new EmbedBuilder()
        .setTitle(prompt)
        .setColor(dominantColor || "Black")
        .setImage("attachment://image.png");

      await interaction.editReply({
        embeds: [imageEmbed],
        files: [attachment],
        content: "",
      });
    } catch (e) {
      console.error(e);
      interaction.editReply({
        fetchReply: true,
        embeds: [
          new EmbedBuilder()
            .setTitle("Hata")
            .setDescription(
              content.anErrorOccurred
            )
            .setColor("Red"),
        ],
        content: "",
      });
    }
  },
};
