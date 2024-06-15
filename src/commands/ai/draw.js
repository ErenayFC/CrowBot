const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const { getColorFromURL } = require("color-thief-node");
const gtranslate = require("free-google-translate");
const { createCanvas, loadImage } = require("canvas");
const translations = loadLanguage(4);
//const brainman = require("brainman");
const { Hercai } = require("hercai");

const herc = new Hercai();
const LanguageDetect = require("languagedetect");
const lngDetector = new LanguageDetect();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const Promise = require("bluebird");

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

    const firstPrompt = interaction.options.getString(
      translations.firstOptionNames["en-US"]
    );
    lngDetector.setLanguageType("iso2");
    const translator = new gtranslate(
      lngDetector.detect(firstPrompt.split("::")[0], 1)[0][0],
      "en"
    );
    const translation = await translator.translate(firstPrompt.split("::")[0]);
    const translatedPrompt = translation;

    async function brainmanImagine(prompt) {
      /*const response = await brainman.imagine({
        prompt,
        version: "dalle",
      });*/
      const response = await herc.drawImage({
        model: firstPrompt.split("::")[1] || "shonin",
        prompt: prompt,
        negative_prompt: "",
      });
      return response.url;
    }

    try {
      const imageArr = await Promise.map(new Array(4), async () => {
        return await brainmanImagine(translatedPrompt);
      });

      const images = await Promise.map(imageArr, async (url) => {
        return await loadImage(url);
      });

      const canvas = createCanvas(2048, 2048); // 2x2 grid
      const ctx = canvas.getContext("2d");

      images.forEach((img, index) => {
        const x = (index % 2) * 1024;
        const y = Math.floor(index / 2) * 1024;
        ctx.drawImage(img, x, y, 1024, 1024);
      });

      const buffer = canvas.toBuffer();
      const attachment = new AttachmentBuilder(buffer, {
        name: "combined.png",
      });

      const dominantColor = await getColorFromURL(imageArr[0]);
      const imageEmbed = new EmbedBuilder()
        .setTitle(firstPrompt.split("::")[0])
        .setColor(dominantColor || "Black")
        .setImage("attachment://combined.png");

      let buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("img_0")
          .setLabel("Resim 1")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("img_1")
          .setLabel("Resim 2")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("img_2")
          .setLabel("Resim 3")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("img_3")
          .setLabel("Resim 4")
          .setStyle(ButtonStyle.Primary)
      );

      const message = await interaction.editReply({
        fetchReply: true,
        embeds: [imageEmbed],
        files: [attachment],
        components: [buttons],
        content: "",
      });

      const filter = (i) =>
        i.customId.startsWith("img_") && i.user.id === interaction.user.id;
      const collector = message.createMessageComponentCollector({
        filter,
        time: 60000,
      });

      collector.on("collect", async (i) => {
        const index = parseInt(i.customId.split("_")[1], 10);
        const response = await fetch(imageArr[index]);
        const imgBuffer = await response.buffer();
        const imgAttachment = new AttachmentBuilder(imgBuffer, {
          name: `image_${index}.png`,
        });
        const updatedColor = await getColorFromURL(imageArr[index]);
        const updatedEmbed = new EmbedBuilder()
          .setTitle(`${firstPrompt.split("::")[0]} - Resim ${index + 1}`)
          .setColor(updatedColor || "Black")
          .setImage(`attachment://image_${index}.png`);

        // Update button states
        buttons.components.forEach((button, btnIndex) => {
          if (btnIndex === index) {
            button.setDisabled(true);
          } else {
            button.setDisabled(false);
          }
        });

        await i.update({
          embeds: [updatedEmbed],
          files: [imgAttachment],
          components: [buttons],
          content: "",
        });
      });

      collector.on("end", (collected) => {
        if (collected.size === 0) {
          message.edit({
            content: "Resim süresi doldu.",
            ephemeral: true,
            components: [],
          });
        }
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
