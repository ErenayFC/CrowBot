const Discord = require("discord.js");
const db = require("erenaydb");
const translation = require("../translate/translation");

module.exports = async (client, interaction) => {
  const content = await translation(interaction.locale, 14, client);

  await interaction.deferReply({ ephemeral: true });
  const PasteEklenmemiş = new Discord.EmbedBuilder()
    .setColor("Red")
    .setTitle(content.errorTitle)
    .setDescription(content.deletePaste.noPasteFound);

  let pastes = (await db.fetch(`paste_${interaction.user.id}`)) || [];

  if (pastes.length === 0) {
    interaction.followUp({ embeds: [PasteEklenmemiş] }).catch((e) => {});
    return;
  }

  const embed = new Discord.EmbedBuilder().setDescription(content.deletePaste.selectPasteToDelete);

  pastes.forEach((paste, index) => {
    embed.addFields({
      name: `<:paste:1230414766070042624> ${content.deletePaste.pasteLabel} ${index + 1}:`,
      value: `${
        paste.content.length < 15
          ? paste.content
          : paste.content.substring(0, 15) + "..."
      } - ${paste.publicCode}`,
    });
  });

  const pasteButtons = pastes.map((paste, index) => ({
    type: 2,
    emoji: { name: "paste", id: "1230414766070042624" },
    label: `Paste ${index + 1}`,
    style: 2,
    custom_id: `delete_paste_${index}`,
  }));

  const rows = [];
  let currentRow = { components: [] };

  for (const button of pasteButtons) {
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
    filter: (interaction) => interaction.customId.startsWith("delete_paste_"),
    time: 30000,
  });

  collector.on("collect", async (interaction) => {
    const pasteIndex = parseInt(interaction.customId.split("_")[2]);
    if (!isNaN(pasteIndex) && pastes[pasteIndex]) {
      await db.unpush(`paste_${interaction.user.id}`, pastes[pasteIndex]);
      await db.unpush(`pastes`, pastes[pasteIndex]);

      const xembed = new Discord.EmbedBuilder()
        .addFields({
          name: "\n",
          value: content.deletePaste.pasteDeletedSuccess(pasteIndex + 1),
        })
        .setColor("Green");
      await interaction.update({
        embeds: [xembed],
        ephemeral: true,
        components: [],
      });
    } else {
      interaction.update({
        content: content.errorOccurred,
        ephemeral: true,
        components: [],
      });
    }
  });

  collector.on("end", async () => {
    pastes = (await db.fetch(`paste_${interaction.user.id}`)) || [];
    const embed = new Discord.EmbedBuilder().setDescription(
      content.deletePaste.timedOut
    );

    pastes.forEach((paste, index) => {
      embed.addFields({
        name: `<:paste:1230414766070042624> **Paste ${index + 1}:** `,
        value: `${
          paste.content.length < 15
            ? paste.content
            : paste.content.substring(0, 15) + "..."
        } - ${paste.publicCode}`,
      });
    });
    replyMessage.edit({
      embeds: [embed],
      components: [],
    });
  });
};
