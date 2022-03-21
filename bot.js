const { Client, Collection, Intents } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const bot_config = require('./bot_config.json');
const fs = require('node:fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commands = [];
var commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const clientId = bot_config.clientId;
const guildId = bot_config.guildId;

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(bot_config.BOT_TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
        
		console.log('Successfully reloaded application (/) commands.');
        console.log(commands.map(c => c.name).join(', ') + ' loads');
	} catch (error) {
		console.error(error);
	}
})();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    console.log("bot ready!");
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
        });
    }
});

client.login(bot_config.BOT_TOKEN);