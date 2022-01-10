const { Client, Collection, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { colors } = require('./config.json');
const fs = require('fs');
require('dotenv').config();

const client = new Client({ partials: ["CHANNEL"], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, async (...args) => {await event.execute(...args)});
	} else {
		client.on(event.name, async (...args) => {await event.execute(...args)});
	}
}

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.adminCommands = new Collection();
const adminCommandFiles = fs.readdirSync('./adminCommands').filter(file => file.endsWith('.js'));

for (const adminFile of adminCommandFiles) {
	const adminCommand = require(`./adminCommands/${adminFile}`);
	client.adminCommands.set(adminCommand.data.name, adminCommand);
}

client.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) {
	const command = client.commands.get(interaction.commandName);
	const adminCommand = client.adminCommands.get(interaction.commandName);

	const time = new Date();

	if (command) {
		try {
			await command.execute(interaction);
			console.log(`[${("0" + time.getHours()).slice(-2)   + ":" + ("0" + time.getMinutes()).slice(-2) + ":" + ("0" + time.getSeconds()).slice(-2)}]${ (interaction.inGuild()) ? ' {'+interaction.guild.name+'}' : ''} ${interaction.user.tag} used ${interaction.commandName}`);
		} catch (error) {
			console.log(`[${("0" + time.getHours()).slice(-2)   + ":" + ("0" + time.getMinutes()).slice(-2) + ":" + ("0" + time.getSeconds()).slice(-2)}]${ (interaction.inGuild()) ? ' {'+interaction.guild.name+'}' : ''}} ${interaction.user.tag} got error using ${interaction.commandName}`);
			console.error(error);
			const replyEmbed = new MessageEmbed()
			.setColor(colors.error)
			.setTitle(`Error while executing command`)
			.setDescription(`\`\`\`${error}\`\`\``)
			await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
		}
	} else if (adminCommand) {
		try {
			await adminCommand.execute(interaction, client);
			console.log(`[${("0" + time.getHours()).slice(-2)   + ":" + ("0" + time.getMinutes()).slice(-2) + ":" + ("0" + time.getSeconds()).slice(-2)}]${ (interaction.inGuild()) ? ' {'+interaction.guild.name+'}' : ''} ${interaction.user.tag} used ${interaction.commandName}`);
		} catch (error) {
			console.log(`[${("0" + time.getHours()).slice(-2)   + ":" + ("0" + time.getMinutes()).slice(-2) + ":" + ("0" + time.getSeconds()).slice(-2)}]${ (interaction.inGuild()) ? ' {'+interaction.guild.name+'}' : ''}} ${interaction.user.tag} got error using ${interaction.commandName}`);
			console.error(error);
			const adminReplyEmbed = new MessageEmbed()
			.setColor(colors.error)
			.setTitle(`Error while executing command`)
			.setDescription(`\`\`\`${error}\`\`\``)
			await interaction.reply({ embeds: [adminReplyEmbed], ephemeral: true });
		}
	}
  }
});

client.login(process.env.BOT_TOKEN);