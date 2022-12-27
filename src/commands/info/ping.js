const { ApplicationCommandType } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Check my latency",
  description_localizations: {
    fr: "Vérifiez ma latence",
  },
  type: ApplicationCommandType.ChatInput,
  cooldown: 10000,
  category: "info",
  run: async (client, interaction) => {
    let embed = {
      description: `🏓 Latency: \`${Math.round(client.ws.ping)} ms\``,
      color: client.colors.botColor,
      footer: {
        text: `Request by ${interaction.user.tag}`,
        icon_url: interaction.user.displayAvatarURL({ dynamic: true }),
      },
    };
    interaction.reply({ embeds: [embed] });
  },
};
