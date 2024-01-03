import "dotenv/config";
import { REST, Routes, ApplicationCommandOptionType } from "discord.js";

const commands = [
  {
    name: "welcome-embed",
    description: "Welcomes people",
  },
  {
    name: "help",
    description: "Documentation for VEEN bot",
  },
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "custom-greet",
    description: "Custom Hello message",
    options: [
      {
        name: "greet",
        description: "Choose the greetings",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: "hello",
            value: "Hello",
          },
          {
            name: "hi",
            value: "Hi",
          },
          {
            name: "yo",
            value: "Yo",
          },
        ],
      },
      {
        name: "username",
        description: "Enter your name",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  console.log("Registering slash(/) commands...");
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Slash(/) commands is successfuly registered...");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
