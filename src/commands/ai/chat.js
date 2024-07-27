const config = require("../../../config.js");
const defaultTranslationLanguage = config.defaultTranslationLanguage;
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const { Hercai } = require("hercai");
const translations = loadLanguage(5);
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
// const {
//   fetchSession,
//   setSession,
//   clearSession,
// } = require("../../../handlers/sessionManager");
const translation = require("../../../handlers/translate/translation.js");

const ITEMS_PER_PAGE = 4096; // Define how many characters per page

const paginateContent = (content, itemsPerPage) => {
  const pages = [];
  for (let i = 0; i < content.length; i += itemsPerPage) {
    pages.push(content.slice(i, i + itemsPerPage));
  }
  return pages;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName(translations.names[defaultTranslationLanguage])
    .setDescription(translations.descriptions[defaultTranslationLanguage])
    .setNameLocalizations(translations.names)
    .setDescriptionLocalizations(translations.descriptions)
    .addStringOption((option) =>
      option
        .setName(translations.firstOptionNames[defaultTranslationLanguage])
        .setDescription(
          translations.firstOptionDescriptions[defaultTranslationLanguage]
        )
        .setNameLocalizations(translations.firstOptionNames)
        .setDescriptionLocalizations(translations.firstOptionDescriptions)
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    await interaction.deferReply();

    const content = await translation(interaction.locale, 5, client);
    const userId = interaction.user.id;

    async function chat(userId, text) {
      // let sessionData = await fetchSession(userId);
      // sessionData.messages.push({ role: "user", content: text });

      // const combinedMessages = sessionData.messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
      
      const herc = new Hercai();
      const response = await herc.question({
        model: "llama3-8b",
        content: text,
      });
      const out = response.reply;
      // sessionData.messages.push({ role: "assistant", content: out });
      // await setSession(userId, sessionData);
      return out;
    }

    const inputText = interaction.options.getString(
      translations.firstOptionNames[defaultTranslationLanguage]
    );
    const content1 = await chat(userId, inputText);
    const pages = paginateContent(content1, ITEMS_PER_PAGE);
    
    // let sessionData = await fetchSession(userId);
    // sessionData.pages = pages;
    // sessionData.currentPage = 0;
    // await setSession(userId, sessionData);

    const components = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("prevPage")
        .setLabel(content.previousPage)
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId("nextPage")
        .setLabel(content.nextPage)
        .setStyle(ButtonStyle.Primary)
        .setDisabled(pages.length <= 1),
      // new ButtonBuilder()
      //   .setCustomId("resetMemory")
      //   .setLabel(content.resetMemory)
      //   .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setLabel(config.sponsor.buttonWebSiteName)
        .setStyle(ButtonStyle.Link)
        .setURL(config.sponsor.link)
    );

    const msg = await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Crow")
          .setColor("DarkVividPink")
          .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.avatarURL(),
          })
          .setFooter({
            text: content.sponsor,
            iconURL: config.sponsor.image,
          })
          .setDescription(pages[0]),
      ],
      components: [components],
    });

    const filter = i => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

    collector.on('collect', async i => {
      if (!i.isButton()) return;

      // let sessionData = await fetchSession(userId);

      // if (!sessionData || !sessionData.pages) {
      //   await i.reply({
      //     content: content.memoryIsEmptyOrFault,
      //     ephemeral: true,
      //   });
      //   return;
      // }

      // if (i.customId === "resetMemory") {
      //   await clearSession(userId);
      //   await i.reply({
      //     content: content.memoryResetted,
      //     ephemeral: true,
      //   });
      //   return;
      // }

      // let { pages, currentPage } = sessionData;
      let currentPage = 0; // Temporary solution

      if (i.customId === "prevPage" && currentPage > 0) {
        currentPage--;
      } else if (
        i.customId === "nextPage" &&
        currentPage < pages.length - 1
      ) {
        currentPage++;
      }

      // sessionData.currentPage = currentPage;
      // await setSession(userId, sessionData);

      const embed = new EmbedBuilder()
        .setTitle("Crow")
        .setColor("DarkVividPink")
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.avatarURL(),
        })
        .setFooter({
          text: content.sponsor,
          iconURL: config.sponsor.image,
        })
        .setDescription(pages[currentPage]);

      const components = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("prevPage")
          .setLabel(content.previousPage)
          .setStyle(ButtonStyle.Primary)
          .setDisabled(currentPage === 0),
        new ButtonBuilder()
          .setCustomId("nextPage")
          .setLabel(content.nextPage)
          .setStyle(ButtonStyle.Primary)
          .setDisabled(currentPage === pages.length - 1),
        // new ButtonBuilder()
        //   .setCustomId("resetMemory")
        //   .setLabel(content.resetMemory)
        //   .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setLabel(config.sponsor.buttonWebSiteName)
          .setStyle(ButtonStyle.Link)
          .setURL(config.sponsor.link)
      );

      await i.update({ embeds: [embed], components: [components] });
    });

    collector.on('end', collected => {
      interaction.editReply({ content: content.timeExpiredForButtons, components: [] });
    });
  },
};