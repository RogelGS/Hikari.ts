import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '@/types';
import { fetchRandomCat } from '@/api/fun.api';
import { createAnimalEmbed } from '@/components/embeds/fun.embed';

const command: Command = {
  data: new SlashCommandBuilder().setName('cat').setDescription('Envía una imagen aleatoria de un gato'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    try {
      const url = await fetchRandomCat();
      const embed = createAnimalEmbed('Gato', url);
      await interaction.editReply({ embeds: [embed] });
    } catch {
      await interaction.editReply('❌ El michi se escapó... intenta de nuevo.');
    }
  },
};

export default command;
