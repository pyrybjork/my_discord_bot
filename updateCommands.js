const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const adminCommands = [];
const adminCommandFiles = fs.readdirSync('./adminCommands').filter(file => file.endsWith('.js'));

for (const file of adminCommandFiles) {
	const adminCommand = require(`./adminCommands/${file}`);
	adminCommands.push(adminCommand.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
    	console.log(commands);

		await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands },
		);

		console.log(adminCommands);

		await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.ADMIN_GUILD),
			{ body: adminCommands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();