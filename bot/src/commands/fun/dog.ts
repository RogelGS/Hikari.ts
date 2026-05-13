import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '@/types';
import { fetchRandomDog } from '@/api/fun.api';
import { createAnimalEmbed } from '@/components/embeds/fun.embed';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('Envía una imagen aleatoria de un perro'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    try {
      const url = await fetchRandomDog();
      const embed = createAnimalEmbed('Perro', url);
      await interaction.editReply({ embeds: [embed] });
    } catch {
      await interaction.editReply('❌ El firulais no quiere salir... intenta de nuevo.');
    }
  },
};

export default command;
