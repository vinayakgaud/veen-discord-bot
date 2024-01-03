import "dotenv/config";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  GatewayIntentBits,
} from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const roles = [
  {
    id: process.env.RED_ROLE,
    label: "Red",
  },
  {
    id: process.env.GREEN_ROLE,
    label: "Green",
  },
  {
    id: process.env.BLUE_ROLE,
    label: "Blue",
  },
];
//dicord could only have 5 buttons on one row, need to create different rows if there is more than 5 roles
client.on("ready", async (c) => {
  console.log(`✅ ${c.user.tag} is online`);

  try {
    const channel = await client.channels.cache.get(process.env.BOT_CHANNEL);
    if (!channel) return;
    const row = new ActionRowBuilder();
    roles.forEach((role) => {
      if (role.label === "Red") {
        row.components.push(
          new ButtonBuilder()
            .setCustomId(role.id)
            .setLabel(role.label)
            .setStyle(ButtonStyle.Danger)
        );
      } else if (role.label === "Blue") {
        row.components.push(
          new ButtonBuilder()
            .setCustomId(role.id)
            .setLabel(role.label)
            .setStyle(ButtonStyle.Primary)
        );
      } else if (role.label === "Green") {
        row.components.push(
          new ButtonBuilder()
            .setCustomId(role.id)
            .setLabel(role.label)
            .setStyle(ButtonStyle.Success)
        );
      }
    });

    await channel.send({
      content: "Claim or drop the role",
      components: [row],
    });

    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);
