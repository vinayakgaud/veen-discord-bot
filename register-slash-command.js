import "dotenv/config";
import { REST, Routes, ApplicationCommandOptionType } from "discord.js";

const commands = [
  {
    name: "help",
    description: "Documentation for VEEN bot",
  },
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "add",
    description: "Add two numbers",
    options: [
      {
        name: "first-number",
        description: "Enter first number",
        type: ApplicationCommandOptionType.Number,
        //choices are the options available for that option, and can only select from that choices only
        choices: [
          {
            name: "one",
            value: 1, //data type of value needs to match type of option
          },
          {
            name: "two",
            value: 2,
          },
        ],
        required: true,
      },
      {
        name: "second-number",
        description: "Enter second number",
        type: ApplicationCommandOptionType.Number,
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
