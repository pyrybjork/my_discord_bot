const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { colors } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Show info about user profile')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('User to select')
            .setRequired(false)),
	async execute(interaction) {
        let user = interaction.options.getUser('user');
        if (!user) {
            user = interaction.user;
        } 
        let options = { year: 'numeric', month: '2-digit', day: '2-digit'};
        let time = user.createdAt;
        const replyEmbed = new MessageEmbed()
	    .setColor(colors.info)
        .setThumbnail(user.displayAvatarURL())
	    .setTitle(`${user.tag}`)
        .addField('Created on', `${time.toLocaleDateString('en-UK', options)}`, false)
        await interaction.reply({ embeds: [replyEmbed] });
	},
};