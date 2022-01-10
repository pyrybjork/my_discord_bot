const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { colors } = require('../config.json');

const Query = require("minecraft-query");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('online')
		.setDescription('Hae onko mineservulla porukkaa'),
	async execute(interaction) {
        try {
            const q = new Query({host: 'lakka.kapsi.fi', port: 62752, timeout: 7500});
            q.fullStat()
                .then(success => {
                    const replyEmbed = new MessageEmbed()
                        .setColor(colors.info)
                        .setTitle(`${success.online_players} online`)
                        .setDescription(`\`${success.players}\``)
                    interaction.reply({ embeds: [replyEmbed] });
                    q.close();
                })
        } catch (e) {
            const errorEmbed = new MessageEmbed()
                .setColor(colors.error)
                .setTitle(String(e))
            interaction.reply({ embeds: [errorEmbed] });
        }
       
	},
};