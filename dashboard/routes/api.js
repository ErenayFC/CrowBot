const express = require("express");
const jwtAuth = require("../middlewares/jwtAuth");
const webpush = require("web-push");
const db = require("erenaydb");
const { publicVapidKey, privateVapidKey } = require("../../config");
const router = express.Router();

router.post("/watchbot/add", jwtAuth, async (req, res) => {
  const {
    bot_id,
    channel_id,
    message,
    webpush,
    email_notify,
    email,
    discord_notify,
    webpushSubscription,
  } = req.body;

  if (!bot_id || !message) {
    return res.status(400).json({ error: "Gerekli alanlar eksik!" });
  }

  if (!webpush && !email_notify && !discord_notify) {
    return res
      .status(400)
      .json({ error: "En az bir bildirim yöntemi seçmelisiniz!" });
  }

  if (discord_notify && !channel_id) {
    return res
      .status(400)
      .json({ error: "Discord bildirimi için kanal ID gerekli!" });
  }
  if (email_notify && !email) {
    return res
      .status(400)
      .json({ error: "Email bildirimi için email gerekli!" });
  }
  if (webpush && !webpushSubscription) {
    return res
      .status(400)
      .json({ error: "Web Push bildirimi için abonelik bilgisi gerekli!" });
  }

  let userBots = (await db.fetch(`bot_${req.user.id}`)) || [];
  let allBots = (await db.fetch(`botlar`)) || [];

  if (
    userBots.some((bot) => bot.id === bot_id) ||
    allBots.some((bot) => bot.id === bot_id)
  ) {
    return res.status(400).json({ error: "Bot zaten mevcut!" });
  }

  try {
    const botuser = await (async () => {
      try {
        return await req.client.users.fetch(bot_id);
      } catch (err) {
        return null;
      }
    })();
    const channel = discord_notify
      ? req.client.channels.cache.find((channel) => channel.id === channel_id)
      : null;

    if (!botuser || (discord_notify && !channel)) {
      return res.status(400).json({ error: "Bot veya kanal bulunamadı!" });
    }

    if (!botuser?.bot) {
      return res.status(400).json({ error: "Bu kişi bir bot değil!" });
    }

    const botData = {
      id: bot_id,
      channelId: channel_id,
      message,
      webpush,
      email_notify,
      email,
      discord_notify,
      webpushSubscription,
      username: botuser.username,
      owner: req.user.id,
    };
    db.push(`bot_${req.user.id}`, botData);
    db.push("botlar", botData);

    return res.status(200).json({ success: "Bot eklendi!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Sunucu hatası!" });
  }
});

router.post("/watchbot/remove", jwtAuth, async (req, res) => {
  const { bot_id } = req.body;

  if (!bot_id) {
    return res.status(400).json({ error: "Bot ID gerekli!" });
  }

  try {
    let userBots = (await db.fetch(`bot_${req.user.id}`)) || [];
    let allBots = (await db.fetch(`botlar`)) || [];

    userBots = userBots.filter((bot) => bot.id !== bot_id);
    allBots = allBots.filter((bot) => bot.id !== bot_id);

    await db.set(`bot_${req.user.id}`, userBots);
    await db.set("botlar", allBots);

    return res.status(200).json({ success: "Bot silindi!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Sunucu hatası!" });
  }
});

webpush.setVapidDetails(
  "mailto:api@crowbot.com.tr",
  publicVapidKey,
  privateVapidKey
);

/*router.post("/notifications/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({ subscription });

  const payload = JSON.stringify({
    title: "Bildirim!",
    body: "Eğer botunuz durum değiştirirse bu şekilde tarayıcınıza bildirim gönderilecektir(Eğer tarayıcınız açıksa)",
  });

  webpush.sendNotification(subscription, payload).catch((error) => {
    console.error(error.stack);
  });
});*/

module.exports = router;
