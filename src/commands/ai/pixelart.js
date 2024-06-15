const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const { getColorFromURL } = require("color-thief-node");
const { createCanvas, loadImage } = require("canvas");
const translations = loadLanguage(6);
const hf = require("@huggingface/inference");
const config = require("../../../config");

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
    await interaction.reply(
      "<a:loading_v2:1074335978900160574> Resminiz oluşturuluyor..."
    );

    const prompt = interaction.options.getString(
      translations.firstOptionNames["en-US"]
    );

    async function imagine(prompt) {
      const response = await hf.textToImage({
        inputs: `${prompt}, pixelartstyle`,
        accessToken: config.huggingFaceAccessToken,
        model: "kohbanye/pixel-art-style", //"nerijs/pixel-art-xl",
      });
      let buffer = Buffer.from(await response.arrayBuffer());
      return buffer;
    }

    try {
      const buffer = await imagine(prompt);
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
              "Şuanda yapay zeka hizmetimizde bir sorun var. Lütfen daha sonra tekrar deneyiniz"
            )
            .setColor("Red"),
        ],
        content: "",
      });
    }
  },
};
