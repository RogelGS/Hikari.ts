import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '@/types';
import FunService from '@/services/fun.service';
import { createCoinEmbed } from '@/components/embeds/fun.embed';

const command: Command = {
  data: new SlashCommandBuilder().setName('coinflip').setDescription('Lanza una moneda al aire'),
  async execute(interaction: ChatInputCommandInteraction) {
    const result = FunService.flipCoin();
    const embed = createCoinEmbed(result);
    await interaction.reply({ embeds: [embed] });
  },
};

export default command;
