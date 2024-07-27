const { ActivityType } = require("discord.js");
const formatNumber = require("../../functions/formatNumber");
const { commands, commandsJSON } = require("../../handlers/commandHandler.js");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    client.commands = commands;
    client.commandsJSON = commandsJSON;

    let activities = [ `Crow❤`, `${client.user.username}`, `${formatNumber(client.guilds.cache.size)} Sunucu`, '/help', 'crowbot.com.tr' ], i = 0;
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, type: ActivityType.Custom }), 10000);
    
    /*setInterval(
      () =>
        client.user.setActivity({
          name: `/help | ${formatNumber(client.guilds.cache.size)} Sunucu`,
          type: ActivityType.Custom,
        }),
      22000
    );*/
  },
};
