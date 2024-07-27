const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

const translation = require("../../../handlers/translate/translation");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const { getColorFromURL } = require("color-thief-node");
const gtranslate = require("free-google-translate");
const { createCanvas, loadImage } = require("canvas");
const translations = loadLanguage(4);
const { Hercai } = require("hercai");

const herc = new Hercai();
const LanguageDetect = require("languagedetect");
const lngDetector = new LanguageDetect();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const Promise = require("bluebird");
const { defaultTranslationLanguage } = require("../../../config");

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
    await interaction.deferReply({ ephemeral: true });
    
    const content = await translation(interaction.locale, 4, client);
    await interaction.editReply({
      content: `<a:loading_v2:1266683216442425407> ${content.generatingImage}...`
    });

    const firstPrompt = interaction.options.getString(
      translations.firstOptionNames[defaultTranslationLanguage]
    );
    lngDetector.setLanguageType("iso2");
    const translator = new gtranslate(
      lngDetector.detect(firstPrompt.split("::")[0], 1)[0][0]/*interaction.locale*/,
      "en"
    );
    const translatedPrompt = await translator.translate(firstPrompt.split("::")[0]);

    async function brainmanImagine(prompt) {
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
          .setLabel(`${content.imageName} 1`)
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("img_1")
          .setLabel(`${content.imageName} 2`)
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("img_2")
          .setLabel(`${content.imageName} 3`)
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("img_3")
          .setLabel(`${content.imageName} 4`)
          .setStyle(ButtonStyle.Primary)
      );

      const message = await interaction.editReply({
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
            content: content.expiredTime,
            components: []
          });
        }
      });
    } catch (e) {
      console.error(e);
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Error")
            .setDescription(content.anErrorOccurred)
            .setColor("Red"),
        ],
        content: "",
      });
    }
  },
};