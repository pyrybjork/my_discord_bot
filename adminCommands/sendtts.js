const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { colors } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sendtts')
		.setDescription('Send message')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('message')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('channelid')
            .setDescription('channel id')
            .setRequired(true)),
	async execute(interaction, client) {
        channelId = interaction.options.getString('channelid');
        const message = interaction.options.getString('message');

        client.channels.cache.get(channelId).send({ content : message, tts : true });

        const replyEmbed = new MessageEmbed()
                .setColor(colors.info)
                .setDescription(`Sent "${message}" to ${channelId}`)

        await interaction.reply({ embeds: [replyEmbed] });
	},
};