module.exports = {
  name: "messageCreate",
  execute: async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
  },
};
