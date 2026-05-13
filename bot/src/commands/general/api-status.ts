import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '@/types';
import StatusService from '@/services/status.service';
import { createStatusEmbed } from '@/components/embeds/general.embed';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('api-status')
    .setDescription('Verifica la conexión con la API de Spring Boot'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    try {
      const statusMessage = await StatusService.checkHealth();
      const embed = createStatusEmbed(statusMessage);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      await interaction.editReply({
        content: `❌ ${error instanceof Error ? error.message : 'Error desconocido'}`,
      });
      throw error;
    }
  },
};

export default command;
