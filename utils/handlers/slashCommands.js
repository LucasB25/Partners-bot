const fs = require('fs');

const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v10');
const { REST } = require('@discordjs/rest')

const config = require("../../config");

const rest = new REST({ version: '10' }).setToken(config.token);

module.exports = (client) => {
	const slashCommands = []; 

	fs.readdirSync('./slashCommands/').forEach(async dir => {
		const files = fs.readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith('.js'));

		for(const file of files) {
				const slashCommand = require(`../../slashCommands/${dir}/${file}`);
				slashCommands.push({
					name: slashCommand.name,
					description: slashCommand.description,
					type: slashCommand.type,
					options: slashCommand.options ? slashCommand.options : null,
					default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
				});
        client.logger.loader(
          `${client.color.chalkcolor.red(`${dir}`)} loaded with ${
            file.length
          } (/) commands`
        );
        client.slashCommands.set(slashCommand.name, slashCommand);
		}
		
	});

	(async () => {
			try {
				await rest.put(
          // GUILD SLASH COMMANDS (will deploy only in the server you put the ID of)
					Routes.applicationGuildCommands(config.botID, config.privateServerID),

          //GLOBAL SLASH COMMANDS
					//Routes.applicationCommands(config.botID),), 
					{ body: slashCommands }
				);
        console.log(
          "[Discord API] Successfully reloaded application (/) commands."
        );
			} catch (error) {
				console.log(error);
			}
	})();
};