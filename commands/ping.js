const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { colors } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Shows bot latency'),
	async execute(interaction) {
        const replyEmbed = new MessageEmbed()
	    .setColor(colors.info)
	    .setTitle(`Latency: ${Math.round(interaction.client.ws.ping)}ms`)
        await interaction.reply({ embeds: [replyEmbed] });
	},
};