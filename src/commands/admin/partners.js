const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "partners",
  description: "Send Partner Embed.",
  type: ApplicationCommandType.ChatInput,
  cooldown: 10000,
  category: "admin",
  default_member_permissions: ["Administrator"],
  options: [
    {
      name: "owner",
      description: "Partner member",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "ping",
      description: "Mention of partnership",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: "Everyone", value: "pingeveryone" },
        { name: "Here", value: "pinghere" },
        { name: "Custom role", value: "pingcustom" },
      ],
    },
    {
      name: "title",
      description: "Partner server name",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "description",
      description: "Partner server description",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "discord",
      description: "Partner’s Server Discord",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "image",
      description: "Partner logo or banner",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "website",
      description: "Partner siteweb",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "botid",
      description: "Partner bot",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    const partnerowner = interaction.options.getUser("owner");
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const images = interaction.options.getString("image");
    const discord = interaction.options.getString("discord");
    const websites = interaction.options.getString("website");
    const bot = interaction.options.getUser("botid");

    if (interaction.options.get("ping").value === "pingeveryone")
      ping = "@everyone";
    if (interaction.options.get("ping").value === "pinghere") ping = "@here";
    if (interaction.options.get("ping").value === "pingcustom")
      ping = client.roles.pingcustom;

    if (description.length < 10)
      return interaction
        .reply({
          content: "The description requires 100 catacrtere minimums",
          ephemeral: true,
        })
        .then(setTimeout(() => interaction.deleteReply(), 10000));

    if (
      !discord.includes(
        "discord.gg/" ||
          "https://discord.gg/" ||
          "http://discord.gg/" ||
          "http://discordapp.com/invite/" ||
          "https://discordapp.com/invite/"
      )
    )
      return interaction
        .reply({
          content: "Your invitation link is not correct",
          ephemeral: true,
        })
        .then(setTimeout(() => interaction.deleteReply(), 10000));

    const regexwebsite =
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gi;

    let regeximage =
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gi;

    let checklink = false;
    if (websites) {
      if (!regexwebsite.exec(websites)) {
        return interaction
          .reply({
            content: "The website you provided is not correct",
            ephemeral: true,
          })
          .then(setTimeout(() => interaction.deleteReply(), 10000));
      } else {
        checklink = true;
      }
    }

    let checkimage = false;
    if (images) {
      if (!regeximage.exec(images)) {
        return interaction
          .reply({
            content: "The image you provided is not correct",
            ephemeral: true,
          })
          .then(setTimeout(() => interaction.deleteReply(), 10000));
      } else {
        checkimage = true;
      }
    }

    const Embed = new EmbedBuilder()
      .setTitle(String(title))
      .setDescription(String(description))
      .setColor(client.colors.botColor)
      .setTimestamp()
      .setImage(`https://test.com`)
      .setFooter({
        text: "Partners",
        avatarURL: client.user.avatarURL(),
      });

    if (images && checkimage === true) {
      Embed.setImage(images);
    }

    const button1 = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setEmoji("⚠️")
      .setLabel("Discord")
      .setURL(discord);

    const button2 = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setEmoji("🔗")
      .setLabel("website")
      .setURL("https://test.com")
      .setDisabled(true);

    const button3 = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setEmoji("🤖")
      .setLabel("Bot")
      .setURL(
        `https://discord.com/oauth2/authorize?client_id=707627135577358417&scope=bot%20applications.commands&permissions=8`
      )
      .setDisabled(true);

    const buttonembed1 = new ActionRowBuilder().addComponents(
      button1,
      button2,
      button3
    );

    if (websites && checklink === true) {
      button2.setDisabled(false).setURL(websites);
    }

    if (bot) {
      button3
        .setDisabled(false)
        .setURL(
          `https://discord.com/oauth2/authorize?client_id=${bot.id}&scope=bot%20applications.commands&permissions=8`
        );
    }

    await interaction
      .reply({
        content: `The message has been sent!`,
        ephemeral: true,
      })
      .then(setTimeout(() => interaction.deleteReply(), 10000));

    await interaction.channel.send({
      content: `**Membres**: ${partnerowner} \n**Mention**: <@&${ping}>`,
      embeds: [Embed],
      components: [buttonembed1],
      ephemeral: false,
    });
  },
};
