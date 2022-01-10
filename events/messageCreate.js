const { guilds } = require('../config.json');

const fallBackUpvote = '👍';
const fallBackDownvote = '👎';

module.exports = {
	name: 'messageCreate',
	async execute(message) {
        const guild = guilds[message.guildId]

        var time = new Date();

		if (message.author.bot) return;

        if (message.channel.type == 'GUILD_TEXT') {
            if (guild.react) {
                if (message.attachments.size > 0 || message.content.includes('https://media.discordapp.net/attachments/') || message.content.includes('https://cdn.discordapp.com/avatars/') || message.content.includes('https://tenor.com/view/')) {
                const upvote = message.guild.emojis.cache.find(emoji => emoji.name === guild.upvote);
                const downvote = message.guild.emojis.cache.find(emoji => emoji.name === guild.downvote);
    
                await message.react((upvote != null) ? upvote : fallBackUpvote);
                await message.react((downvote != null) ? downvote : fallBackDownvote);
                }
            }
        } else if (message.channel.type == 'DM') {
            console.log(`[${("0" + time.getHours()).slice(-2)   + ":" + ("0" + time.getMinutes()).slice(-2) + ":" + ("0" + time.getSeconds()).slice(-2)}] ${message.author.tag}: ${message.content}`);
        }
	},
};