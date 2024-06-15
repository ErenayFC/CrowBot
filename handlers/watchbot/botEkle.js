const { EmbedBuilder } = require("discord.js");
const db = require("erenaydb");

module.exports = async (client, interaction) => {
  const BotVar = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(
      `<:Carpi:1046504575277998130> **Belirtilen bot sistemde bulunuyor.**`
    );

  const BotDegil = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:Carpi:1046504575277998130> **Bu bir bot değil**`);
  const BotEklendi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Başarılı")
    .setDescription(
      `<:Tik:1046504590775947274> **Botunuz başarıyla sisteme eklendi. Bizi tercih ettiğiniz için teşekkür ederiz.**`
    );
  const channelOrBotNotFound = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(
      "<:Carpi:1046504575277998130> **Crow ID'lerini girdiğin kanala veya botundan ikisinden birine erişemiyor. Lütfen Crow'un bunlara erişebildiğine emin ol**"
    );

  if (!(await db.fetch(`bot_${interaction.user.id}`))) {
    await db.set(`bot_${interaction.user.id}`, []);
  }
  const link = await interaction.fields.getTextInputValue("botid");
  const message = await interaction.fields.getTextInputValue("messagecontent");
  const channelID = await interaction.fields.getTextInputValue("channelid");
  let link2 = (await db.fetch(`bot_${interaction.user.id}`)) || [];
  let link3 = (await db.fetch(`botlar`)) || [];

  if (!link) return;

  if (
    link2.some((bot) => bot.id === link) ||
    link3.some((bot) => bot.id === link)
  ) {
    interaction.reply({ embeds: [BotVar], ephemeral: true }).catch((e) => {});
  } else {
    const addLink = link;
    const botuser = await client.users.fetch(addLink);
    const channel = client.channels.cache.find(
      (channel) => channel.id == channelID
    );
    if (!botuser || !channel) {
      interaction.reply({
        embeds: [channelOrBotNotFound],
      });
    }
    if (botuser.bot) {
      await db.push(`bot_${interaction.user.id}`, {
        id: addLink,
        channelId: channelID,
        message,
        username: botuser.username,
        owner: interaction.user.id,
      });
      await db.add(`botsayısı_${interaction.user.id}`, 1);
      await db.push("botlar", {
        id: addLink,
        channelId: channelID,
        message,
        username: botuser.username,
        owner: interaction.user.id,
      });
      interaction
        .reply({ embeds: [BotEklendi], ephemeral: true })
        .catch((e) => {});
    } else {
      interaction.reply({ embeds: [BotDegil] });
    }
  }
};
