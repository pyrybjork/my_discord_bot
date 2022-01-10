const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { colors } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('del')
		.setDescription('delete message')
        .addStringOption(option =>
            option.setName('messageid')
                .setDescription('messageid')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('channelid')
            .setDescription('channel id')
            .setRequired(true)),
	async execute(interaction, client) {
        channelId = interaction.options.getString('channelid');
        const messageId = interaction.options.getString('messageid');

        client.channels.cache.get(channelId).messages.fetch(messageId).then(msg => msg.delete());

        const replyEmbed = new MessageEmbed()
                .setColor(colors.info)
                .setDescription(`Deleted "${messageId}" from ${channelId}`)

        await interaction.reply({ embeds: [replyEmbed] });
	},
};