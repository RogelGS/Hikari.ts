import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '@/types';

const command: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Responde con Pong!'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('🏓 ¡Pong!');
  },
};

export default command;
