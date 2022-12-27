const fs = require("fs");
const {
  Client,
  Collection,
  Partials,
  GatewayIntentBits,
} = require("discord.js");

const client = new Client({
  fetchAllMembers: true,
  Mentions: {
    everyone: false,
    roles: false,
    users: false,
  },
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildWebhooks,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction,
  ],
});

client.commands = new Collection();

client.embeds = require("./data/config/embeds");
client.emotes = require("./data/config/emotes");
client.colors = require("./data/config/colors");
client.roles = require("./data/config/roles");
client.canals = require("./data/config/canals");
client.config = require("./data/config/config");

module.exports = client;

fs.readdirSync("./src/handlers").forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(client.config.token);
