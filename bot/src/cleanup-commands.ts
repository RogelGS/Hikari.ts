import { REST, Routes } from 'discord.js';
import config from '@/utils/config';

const rest = new REST().setToken(config.DISCORD_TOKEN);
const clientId = config.CLIENT_ID;
const guildId = config.GUILD_ID;

(async () => {
    try {
        console.log('🧹 Limpiando comandos antiguos...');

        // 1. Borrar comandos globales
        await rest.put(Routes.applicationCommands(clientId), { body: [] });
        console.log('✅ Comandos Globales eliminados.');

        // 2. Borrar comandos de servidor (Guild)
        if (guildId && guildId !== 'TU_ID_DE_SERVIDOR') {
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] });
            console.log(`✅ Comandos del Servidor ${guildId} eliminados.`);
        }

        console.log('✨ Limpieza completada. Ahora puedes ejecutar: bun run deploy');
    } catch (error) {
        console.error('❌ Error durante la limpieza:', error);
    }
})();
