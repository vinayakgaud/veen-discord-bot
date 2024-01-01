import "dotenv/config";
import { REST, Routes } from "discord.js";

const commands = [
  {
    name: "help",
    description: "Documentation for VEEN bot",
  },
  {
    name: "ping",
    description: "Replies with Pong!",
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
