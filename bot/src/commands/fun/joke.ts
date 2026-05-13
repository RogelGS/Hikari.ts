import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '@/types';
import { fetchRandomJoke } from '@/api/fun.api';
import { createJokeEmbed } from '@/components/embeds/fun.embed';

const command: Command = {
  data: new SlashCommandBuilder().setName('joke').setDescription('Cuenta un chiste aleatorio'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    try {
      const joke = await fetchRandomJoke();
      const embed = createJokeEmbed(joke);
      await interaction.editReply({ embeds: [embed] });
    } catch {
      await interaction.editReply('❌ No se me ocurrió ningún chiste ahora mismo...');
    }
  },
};

export default command;
