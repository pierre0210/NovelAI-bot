import { Client, GatewayIntentBits, Interaction } from "discord.js";
import { interactionCreate } from "./events/interactionCreate";
import { ready } from "./events/ready";
import { ClientExtension } from "./interfaces/clientExtension";
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) as ClientExtension;

client.on("ready", async () => await ready(client));

client.on("interactionCreate", async (interaction: Interaction) => interactionCreate(interaction, client));

client.login(process.env.BOT_TOKEN);