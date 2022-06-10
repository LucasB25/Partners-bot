const { Client, Collection, Intents } = require("discord.js");
const client = new Client({
  allowedMentions: { parse: ["users", "roles"] },
  fetchAllMembers: false,
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
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
