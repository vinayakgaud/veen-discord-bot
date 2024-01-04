import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  GuildMember,
  ActivityType,
} from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online`);
  client.user.setActivity({
    name: "life burn 🔥", //default activity is playing
    type: ActivityType.Watching,
  });
});

client.on("messageCreate", (message) => {
  // console.log(message)
  if (
    message.author.username !== "veen" &&
    (message.content === "hello" || message.content === "hi")
  ) {
    //here we are only skipping message form our bot and accepting messages from other bots also
    //message.author.bot - for all bots
    message.reply({
      content: `hello ${message.author.username}`,
    });
  }
});

client.on("guildMemberAdd", (guildMember) => {});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) {
      if (!interaction.isChatInputCommand()) return; //executing interaction only for / commands
      if (interaction.commandName === "ping") interaction.reply("Pong!");
      if (interaction.commandName === "help")
        interaction.reply("This is manual for veen bot");
      if (interaction.commandName === "add") {
        const num1 = interaction.options.get("first-number").value; //we are getting value from the obj we got using get function, we would have used ? after get function if we had required false
        const num2 = interaction.options.get("second-number").value;

        interaction.reply(`The sum is : ${num1 + num2}`);
      }
      if (interaction.commandName === "custom-greet") {
        const greet = interaction.options.get("greet").value;
        const username = interaction.options.get("username").value;

        interaction.reply(`${greet} ${username}!, Welcome to our server`);
      }
      if (interaction.commandName === "welcome-embed") {
        console.log("interaction: ", interaction);
        const embed = new EmbedBuilder()
          .setTitle("Embed Title")
          .setDescription("Embed Description")
          .setAuthor({
            name: "Embed Author",
            iconURL:
              "https://media.giphy.com/media/MJvVMf2xiQxRawECs3/giphy.gif",
            url: "https://www.discord.js.org/",
          })
          .setColor("Random")
          .setURL("https://www.discord.js.org/")
          .setImage(interaction.user.avatarURL())
          .addFields({
            name: `Welcome ${interaction.user.username}`,
            value: `Let's have fun`,
          });
        interaction.reply({ embeds: [embed] });
      }
    } else {
      const role = interaction.guild.roles.cache.get(interaction.customId);
      await interaction.deferReply({ ephemeral: true }); //this give user message that bot is thinking
      if (!role) {
        interaction.editReply({
          content: "Role is not present",
        });
        return;
      }

      const hasRole = interaction.member.roles.cache.has(role.id);
      if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The role ${role} has been removed`);
        return;
      }

      await interaction.member.roles.add(role);
      await interaction.editReply(`The role ${role} has been added`);
    }
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);
