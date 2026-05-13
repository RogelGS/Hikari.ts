import { REST, Routes, type RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import path from 'path';
import fs from 'node:fs';
import config from '@/utils/config';

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
const foldersPath = path.join(import.meta.dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  if (!fs.lstatSync(commandsPath).isDirectory()) continue;

  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const { default: command } = await import(filePath);
    if (command && 'data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    }
  }
}

const rest = new REST().setToken(config.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`[DEPLOY] Iniciando el refresco de ${commands.length} comandos...`);

    const data = (await rest.put(
      Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID),
      {
        body: commands,
      },
    )) as unknown[];

    console.log(`[DEPLOY] Se registraron ${data.length} comandos exitosamente.`);
  } catch (error) {
    console.error(error);
  }
})();
