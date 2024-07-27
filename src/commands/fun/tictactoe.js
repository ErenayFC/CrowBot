const { SlashCommandBuilder } = require("discord.js");
const loadLanguage = require("../../../handlers/translate/loadLanguage");
const translations = loadLanguage(8);
const TicTacToe = require('discord-tictactoe');
const { defaultTranslationLanguage } = require("../../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(translations.names[defaultTranslationLanguage])
        .setDescription(translations.descriptions[defaultTranslationLanguage])
        .setNameLocalizations(translations.names)
        .setDescriptionLocalizations(translations.descriptions)
        .addUserOption((option) =>
            option
              .setName(translations.firstOptionNames[defaultTranslationLanguage])
              .setDescription(translations.firstOptionDescriptions[defaultTranslationLanguage])
              .setNameLocalizations(translations.firstOptionNames)
              .setDescriptionLocalizations(translations.firstOptionDescriptions)
          ),
    run: async (client, interaction) => {
        /**
         * @param {import('discord.js').Client} client
         * @param {import('discord.js').ChatInputCommandInteraction} interaction
         */

        const game = new TicTacToe({ language: interaction.locale.split('-')[0], aiDifficulty: 'Medium', commandOptionName: translations.firstOptionNames[defaultTranslationLanguage] });
        game.handleInteraction(interaction);
        game.on('win', (winner, loser) => {
            // Add Economy System First :)
        });
        game.on('tie', (players) => {
            // Add Economy System First :)
        })
    },
};
