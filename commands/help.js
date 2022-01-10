const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { colors } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Show help menu')
		.addStringOption(option => 
            option.setName('command')
            .setDescription('Show help for specific command')
            .setRequired(false)
            .addChoice('help', 'help')
            .addChoice('ping', 'ping')
            .addChoice('pfp', 'pfp')
            .addChoice('nword', 'nword')
            .addChoice('profile', 'profile')
            .addChoice('akseli', 'akseli')),
	async execute(interaction) {
        const command = interaction.options.getString('command');
        switch(command) {
            case 'help':
                const helpReplyEmbed = new MessageEmbed()
                .setColor(colors.info)
                .setTitle(`/help`)
                .setDescription(`Show help menu. \n Use \`/help <command>\` to get more info about a command.`)
                await interaction.reply({ embeds: [helpReplyEmbed] });
                break;
            
            case 'ping':
                const pingReplyEmbed = new MessageEmbed()
                .setColor(colors.info)
                .setTitle(`/ping`)
                .setDescription(`Show bot latency`)
                await interaction.reply({ embeds: [pingReplyEmbed] });
                break;

            case 'pfp':
                const pfpReplyEmbed = new MessageEmbed()
                .setColor(colors.info)
                .setTitle(`/pfp`)
                .setDescription(`Show user profile picture \n\`/pfp <user>\` Default user is yourself`)
                await interaction.reply({ embeds: [pfpReplyEmbed] });
                break;

            case 'profile':
                const profileReplyEmbed = new MessageEmbed()
                .setColor(colors.info)
                .setTitle(`/profile`)
                .setDescription(`Show user profile \n\`/profile <user>\` Default user is yourself`)
                await interaction.reply({ embeds: [profileReplyEmbed] });
                break;

            case 'nword':
                const nwordReplyEmbed = new MessageEmbed()
                .setColor(colors.info)
                .setTitle(`/nword`)
                .setDescription(`Show random nword \n\`/nword <True | False, Disables nwords startign with "non"> Default false\``)
                await interaction.reply({ embeds: [nwordReplyEmbed] });
                break;

            case 'akseli':
                const akseliReplyEmbed = new MessageEmbed()
                .setColor(colors.info)
                .setTitle(`/akseli`)
                .setDescription(`Akseli moment \n\`/akseli\``)
                await interaction.reply({ embeds: [akseliReplyEmbed] });
                break;
            
            default:
                const replyEmbed = new MessageEmbed()
                .setColor(colors.info)
                .setTitle(`Commands`)
                .setDescription(`• \`/help\` \n• \`/ping\` \n• \`/pfp\`\n• \`/nword\`\n• \`/profile\`\n• \`/akseli\``)
                await interaction.reply({ embeds: [replyEmbed] });
        }
	},
};