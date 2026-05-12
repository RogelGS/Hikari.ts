import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '@/types';
import StatusService from '@/services/status.service';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('api-status')
    .setDescription('Verifica la conexión con la API de Spring Boot'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    try {
      const statusMessage = await StatusService.checkHealth();
      await interaction.editReply({ content: statusMessage });
    } catch (error) {
      await interaction.editReply({
        content: `❌ ${error instanceof Error ? error.message : 'Error desconocido'}`,
      });
      throw error;
    }
  },
};

export default command;
