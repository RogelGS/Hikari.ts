import { Client, Collection, GatewayIntentBits } from 'discord.js';
import path from 'path';
import fs from 'node:fs';
import config from '@/utils/config';
import { initMonitoring, reportError } from '@/utils/monitor';

// Inicializar Sentry y Monitoreo
initMonitoring();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.commands = new Collection();

// --- CARGA DE COMANDOS ---
const foldersPath = path.join(import.meta.dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  // Si es un archivo en la raíz de commands, lo manejamos (opcional)
  if (!fs.lstatSync(commandsPath).isDirectory()) continue;

  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const { default: command } = await import(filePath);

    if (command && 'data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
      console.log(`[LOADER] Comando cargado: ${folder}/${command.data.name}`);
    }
  }
}

// --- CARGA DE EVENTOS ---
const eventsPath = path.join(import.meta.dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.ts'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const { default: event } = await import(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
  console.log(`[LOADER] Evento cargado: ${event.name}`);
}

const token = config.DISCORD_TOKEN;
client.login(token);

// --- MANEJO GLOBAL DE ERRORES ---
process.on('unhandledRejection', (reason) => {
  reportError(reason, 'Unhandled Rejection');
});

process.on('uncaughtException', (error) => {
  reportError(error, 'Uncaught Exception');
});
