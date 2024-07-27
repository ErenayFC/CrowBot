const Discord = require("discord.js");
const db = require("erenaydb");
const translation = require("../translate/translation");

module.exports = async (client, interaction) => {
  const content = await translation(interaction.locale, 13, client);

  await interaction.deferReply({ ephemeral: true });
  const links = (await db.fetch(`bot_${interaction.user.id}`)) || [];

  if (links.length === 0) {
    interaction.reply(content.delBot.noBotFound);
    return;
  }

  const embed = new Discord.EmbedBuilder().setDescription(
    content.delBot.selectBotToDelete
  );

  links.forEach((link, index) => {
    embed.addFields({
      name: `<:Bot:1086944624414826506> **${content.delBot.botLabel} ${index + 1}:** `,
      value: `${link.id} - <#${link.channelId}>`,
    });
  });

  const linkButtons = links.map((link, index) => ({
    type: 2,
    emoji: { name: "Bot", id: "1086944624414826506" },
    label: `${content.delBot.botLabel} ${index + 1}`,
    style: 2,
    custom_id: `delete_bot_${index}`,
  }));

  const rows = [];
  let currentRow = { components: [] };

  for (const button of linkButtons) {
    if (currentRow.components.length < 5) {
      currentRow.components.push(button);
    } else {
      rows.push({ type: 1, components: [...currentRow.components] });
      currentRow = { components: [button] };
    }
  }

  if (currentRow.components.length > 0) {
    rows.push({ type: 1, components: [...currentRow.components] });
  }

  const replyMessage = await interaction
    .followUp({
      embeds: [embed],
      components: rows,
      ephemeral: true,
    })
    .catch((e) => {});

  const collector = replyMessage.createMessageComponentCollector({
    filter: (interaction) => interaction.customId.startsWith("delete_bot_"),
    time: 30000,
  });

  collector.on("collect", async (interaction) => {
    const linkIndex = parseInt(interaction.customId.split("_")[2]);
    if (!isNaN(linkIndex) && links[linkIndex]) {
      await db.unpush(`bot_${interaction.user.id}`, links[linkIndex]);
      await db.unpush(`botlar`, links[linkIndex]);

      const xembed = new Discord.EmbedBuilder().addFields({
        name: "\n",
        value: content.delBot.botDeletedSuccess(linkIndex + 1),
      });
      await interaction.update({
        embeds: [xembed],
        ephemeral: true,
        components: [],
      });
    } else {
      interaction.update({
        content: content.delBot.errorOccurred,
        ephemeral: true,
        components: [],
      });
    }
  });
  collector.on("end", () => {
    const embed = new Discord.EmbedBuilder().setDescription(
      content.delBot.youCanDeleteYourBot
    );

    links.forEach((link, index) => {
      embed.addFields({
        name: `<:Bot:1086944624414826506> **Bot ${index + 1}:** `,
        value: `${link.id} - <#${link.channelId}>`,
      });
    });
    replyMessage.edit({
      embeds: [embed],
      components: [],
    });
  });
};
