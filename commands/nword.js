const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const math = require('mathjs');

const words = fs.readFileSync('./data/nwords.txt').toString().split("\n");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nword')
		.setDescription('Show n-word')
        .addBooleanOption(option => 
            option.setName('non')
            .setDescription('Disables nwords starting with "non"')
            .setRequired(false)),
	async execute(interaction) {
        var non = interaction.options.getBoolean('non');
        if (non == null) { non = false }

        console.log(non);

        if (non == true) {
            var word = words[math.floor(math.random()*words.length)];
            while (word.startsWith('non')) {
                var word = words[math.floor(math.random()*words.length)];
            }
            await interaction.reply(word);
        } else {
            var word = words[math.floor(math.random()*words.length)];
            await interaction.reply(word);
        } 
	},
};