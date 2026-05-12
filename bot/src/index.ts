import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config(); // También busca en la carpeta actual por si acaso

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.error('DISCORD_TOKEN is missing in environment variables');
  process.exit(1);
}

client.login(token);
