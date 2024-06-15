const Discord = require("discord.js");
const db = require("erenaydb");

module.exports = async (client, interaction) => {
  await interaction.deferReply({ ephemeral: true });
  const PasteEklenmemiş = new Discord.EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(
      `**Maalesef şuanda sistemde sana ait olan hiçbir paste yok. </pastebin oluştur:786466522972946462> yazarak bir paste oluşturmaya ne dersin?**`
    );
  let pastes = (await db.fetch(`paste_${interaction.user.id}`)) || [];

  if (pastes.length === 0) {
    interaction
      .followUp({
        embeds: [PasteEklenmemiş],
      })
      .catch((e) => {});
    return;
  }

  const embed = new Discord.EmbedBuilder().setDescription(
    "Aşağıdaki butonlardan birini seçerek pasteni silebilirsin:"
  );

  pastes.forEach((paste, index) => {
    embed.addFields({
      name: `<:paste:1230414766070042624> **Paste ${index + 1}:** `,
      value: `${
        paste.content.length < 15
          ? link.content
          : link.content.substring(0, 15) + "..."
      } - ${link.publicCode}`,
    });
  });

  const linkButtons = links.map((paste, index) => ({
    type: 2,
    emoji: { name: "paste", id: "1230414766070042624" },
    label: `Paste ${index + 1}`,
    style: 2,
    custom_id: `delete_paste_${index}`,
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
    filter: (interaction) => interaction.customId.startsWith("delete_paste_"),
    time: 30000,
  });

  collector.on("collect", async (interaction) => {
    const pasteIndex = parseInt(interaction.customId.split("_")[2]);
    if (!isNaN(pasteIndex) && pastes[linkIndex]) {
      await db.unpush(`paste_${interaction.user.id}`, pastes[pasteIndex]);
      await db.unpush(`pastes`, pastes[pasteIndex]);

      const xembed = new Discord.EmbedBuilder()
        .addFields({
          name: "\n",
          value: `- Paste ${linkIndex + 1} başarıyla silindi`,
        })
        .setColor("Green");
      await interaction.update({
        embeds: [xembed],
        ephemeral: true,
        components: [],
      });
    } else {
      interaction.update({
        content: "Bir hata oluştu. Lütfen tekrar deneyin.",
        ephemeral: true,
        components: [], // Butonları temizle
      });
    }
  });

  collector.on("end", async () => {
    pastes = (await db.fetch(`paste_${interaction.user.id}`)) || [];
    const embed = new Discord.EmbedBuilder().setDescription(
      "İşlem zamanaşımına uğradı."
    );

    pastes.forEach((link, index) => {
      embed.addFields({
        name: `<:paste:1230414766070042624> **Paste ${index + 1}:** `,
        value: `${
          link.content.length < 15
            ? link.content
            : link.content.substring(0, 15) + "..."
        } - ${link.publicCode}`,
      });
    });
    replyMessage.edit({
      embeds: [embed],
      components: [],
    });
  });
};
