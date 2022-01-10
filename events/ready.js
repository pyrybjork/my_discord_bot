module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Logged in as ${client.user.tag}`);
		client.user.setPresence({ activities: [{ name: 'with ma ding dong' , type: 'PLAYING'}], status: 'online' });
	},
};