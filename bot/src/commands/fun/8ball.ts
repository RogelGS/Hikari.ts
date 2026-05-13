import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '@/types';
import FunService from '@/services/fun.service';
import { create8BallEmbed } from '@/components/embeds/fun.embed';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Hazle una pregunta a la bola 8 mágica')
    .addStringOption((option) =>
      option.setName('pregunta').setDescription('Lo que quieres preguntar').setRequired(true),
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const question = interaction.options.getString('pregunta', true);
    const answer = FunService.get8BallResponse();
    const embed = create8BallEmbed(question, answer);

    await interaction.reply({ embeds: [embed] });
  },
};

export default command;
