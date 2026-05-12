import { Events, type Interaction } from 'discord.js';
import type { Event } from '@/types';
import { reportError } from '@/utils/monitor';

const event: Event<Events.InteractionCreate> = {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No se encontró el comando ${interaction.commandName}`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      // 1. Reporte global (Sentry/Discord)
      await reportError(error, `Command: ${interaction.commandName}`);

      // 2. Solo respondemos si el comando no lo hizo ya
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: '¡Hubo un error al ejecutar este comando!',
          ephemeral: true,
        });
      }
    }
  },
};

export default event;
