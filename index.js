import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online`);
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

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return; //executing interaction only for / commands
  if (interaction.commandName === "ping") interaction.reply("Pong!");
  if (interaction.commandName === "help")
    interaction.reply("This is manual for veen bot");
});

client.login(process.env.TOKEN);