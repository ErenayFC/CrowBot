const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = async (client, interaction) => {
  const BotEklemeFormu = new ModalBuilder()
    .setCustomId("boteklemeform")
    .setTitle("Bot ekle");

  const BotId = new TextInputBuilder()
    .setCustomId("botid")
    .setLabel("Discord Bot ID'nizi giriniz")
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(16)
    .setMaxLength(20)
    .setPlaceholder("1234567890123456789")
    .setRequired(true);

  const ChannelId = new TextInputBuilder()
    .setCustomId("channelid")
    .setLabel("Mesajın atılacağı kanal ID'sini giriniz")
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(16)
    .setMaxLength(20)
    .setPlaceholder("1234567890123456789")
    .setRequired(true);

  const GuildId = new TextInputBuilder()
    .setCustomId("messagecontent")
    .setLabel("Mesajın içeriğini yazın. Bilgi için /help")
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(13)
    .setMaxLength(256)
    .setPlaceholder("1234567890123456789")
    .setRequired(true);
  const BotEklemeSistemi = new ActionRowBuilder();
  BotEklemeSistemi.addComponents(BotId);

  const ChannelEklemeSistemi = new ActionRowBuilder();
  ChannelEklemeSistemi.addComponents(ChannelId);

  const GuildEklemeSistemi = new ActionRowBuilder();
  GuildEklemeSistemi.addComponents(GuildId);

  BotEklemeFormu.addComponents(
    BotEklemeSistemi,
    ChannelEklemeSistemi,
    GuildEklemeSistemi
  );

  await interaction.showModal(BotEklemeFormu);
};
