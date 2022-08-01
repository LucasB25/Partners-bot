const { Client, Collection, Intents, GatewayIntentBits } = require("discord.js");

const client = new Client({
fetchAllMembers: false,
Mentions: {
        everyone: false,
        roles: false,
        users: false
      },
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
      ],
    });
//SET COLLECTION
client.commandes = new Collection();
client.slash = new Collection();
client.aliases = new Collection();
cooldowns = new Collection();

//SET UTILS
client.logger = require("./utils/logger");
client.color = require("./utils/color.js");

//SET CONFIG
client.config = require("./config");

// LOAD THE 3 HANDLERS
["slashCommands", "event"].forEach((file) => {
  require(`./utils/handlers/${file}`)(client);
});

client.login(client.config.token);
