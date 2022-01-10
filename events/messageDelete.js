const { MessageEmbed } = require('discord.js');
const { colors } = require('../config.json');
const { guilds } = require('../config.json');

module.exports = {
	name: 'messageDelete',
	async execute(message) {
        const guild = guilds[message.guildId];
        const time = new Date();

        const bannedWords = guild.bannedWords;

        let text = message.content;
        let state = false; //true if bad words found
        bannedWords.forEach(word => {
            if (text.toLowerCase().includes(word)) {
                state = true;
            }
        });
        if (state) {
            const replyEmbed = new MessageEmbed()
            .setColor(colors.info)
            .setTitle(`${message.author.tag} poisti viestin`)
            .setDescription(`${text}`)
            await message.channel.send({ embeds: [replyEmbed] });
            console.log(`[${("0" + time.getHours()).slice(-2)   + ":" + ("0" + time.getMinutes()).slice(-2) + ":" + ("0" + time.getSeconds()).slice(-2)}]${ (message.inGuild()) ? ' {'+message.guild.name+'}' : ''} ${message.author.tag} deleted "${text}"`);
        }
	},
};