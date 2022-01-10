const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { colors } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('akseli')
		.setDescription('Akseli moment'),
	async execute(interaction) {
        await interaction.reply({ files: ["./data/akselitweakedtoohard.png"] });
	},
};