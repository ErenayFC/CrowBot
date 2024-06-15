const { ActivityType } = require("discord.js");
const formatNumber = require("../../functions/formatNumber");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    // let activities = [ `Crow❤`, `${client.user.username}` ], i = 0;
    // setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, type: ActivityType.Listening }), 22000);
    setInterval(
      () =>
        client.user.setActivity({
          name: `/help | ${formatNumber(client.guilds.cache.size)} Sunucu`,
          type: ActivityType.Playing,
        }),
      22000
    );
  },
};
