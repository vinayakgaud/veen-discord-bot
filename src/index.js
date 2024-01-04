import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import eventHandler from "./handler/eventHandler.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

eventHandler(client);

client.login(process.env.TOKEN);
