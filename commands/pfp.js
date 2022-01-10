const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { colors } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pfp')
		.setDescription('Show user profile picture')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('User to select')
            .setRequired(false)),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        if (!user) {
            await interaction.reply(interaction.user.displayAvatarURL());
        } else {
            await interaction.reply(user.displayAvatarURL());
        }
	},
};