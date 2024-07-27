const Discord = require("discord.js");
const db = require("erenaydb");
const webpush = require("web-push");
const { email } = require("../../config");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: email.host,
  port: email.port,
  auth: {
    user: email.username,
    pass: email.password,
  },
});

module.exports = async (botlar, client) => {
  botlar.forEach(async (bot) => {
    const botuser = await client.users.fetch(bot.id);
    const channel = client.channels.cache.find(
      (channel) => channel.id == bot.channelId
    );

    if (!channel) return;
    try {
      const guild = await client.guilds.fetch(channel.guildId);
      const member = await guild.members.fetch(bot.id);
      const presence = member.presence;

      let statusmsg = `**Aktif**`;
      if (!presence) return;
      if (presence && presence.status && presence.status === "offline")
        statusmsg = `**Deaktif**`;

      if (bot.status !== statusmsg) {
        bot.status = statusmsg;
        bot.username = member.user.username;
        await db.set("botlar", botlar);

        const mesaj = bot.message
          .replaceAll("botisim", botuser.username)
          .replaceAll("durum", statusmsg)
          .replaceAll("botname", botuser.username)
          .replaceAll("status", statusmsg);

        // Send Discord notification
        if (bot.discord_notify) {
          const discordChannel = client.channels.cache.get(bot.channelId);
          if (discordChannel) {
            discordChannel.send({
              tts: false,
              content: `<@${bot.owner}>`,
              embeds: [
                {
                  description: mesaj,
                  color: Discord.Colors.Gold,
                  footer: {
                    text: "Son güncelleme:",
                  },
                  timestamp: new Date().toISOString(),
                },
              ],
              components: [],
              actions: {},
            });
          } else {
            const user = await client.users.fetch(bot.owner);
            if (user) {
              user.send({
                content: `${bot.channelId} adlı bir kanalı bulamadığım için bu mesaj size özel olarak gönderilmiştir`,
                embeds: [
                  {
                    description: mesaj,
                    color: Discord.Colors.Gold,
                    footer: {
                      text: "Son güncelleme:",
                    },
                    timestamp: new Date().toISOString(),
                  },
                ],
              });
            } else {
              db.unpush("botlar", bot);
              db.delete(`bot_${bot.owner}`);
            }
          }
        }

        // Send Web Push notification
        if (bot.webpush) {
          const payload = JSON.stringify({
            title: bot.username + "Bot Durum Güncellemesi",
            body: mesaj.replaceAll("**", ""),
            image: botuser.displayAvatarURL()
          });

          webpush
            .sendNotification(bot.webpushSubscription, payload)
            .catch((error) => {
              console.error("Web Push Error:", error.stack);
            });
        }

        // Send Email notification
        if (bot.email_notify) {
          const mailOptions = {
            from: "api@crowbot.com.tr",
            to: bot.email,
            subject: bot.username + "Bot Durum Güncellemesi",
            text: mesaj.replace("**", "<b>").replace("**", "</b>"),
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Email Error:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  });
};
