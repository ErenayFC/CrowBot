const { SlashCommandBuilder } = require("discord.js");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const translations = loadLanguage(8);
const TicTacToe = require('discord-tictactoe');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(translations.names["en-US"])
        .setDescription(translations.descriptions["en-US"])
        .setNameLocalizations(translations.names)
        .setDescriptionLocalizations(translations.descriptions)
        .addUserOption((option) =>
            option
              .setName(translations.firstOptionNames["en-US"])
              .setDescription(translations.firstOptionDescriptions["en-US"])
              .setNameLocalizations(translations.firstOptionNames)
              .setDescriptionLocalizations(translations.firstOptionDescriptions)
          ),
    run: async (client, interaction) => {
        /**
         * @param {import('discord.js').Client} client
         * @param {import('discord.js').ChatInputCommandInteraction} interaction
         */

        const game = new TicTacToe({ language: interaction.locale.split('-')[0], aiDifficulty: 'Medium', commandOptionName: translations.firstOptionNames["en-US"] });
        game.handleInteraction(interaction);
        game.on('win', (winner, loser) => {
            // Add Economy System First :)
        });
        game.on('tie', (players) => {
            // Add Economy System First :)
        })
    },
};
