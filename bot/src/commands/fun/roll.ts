import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '@/types';
import FunService from '@/services/fun.service';
import { createDiceEmbed } from '@/components/embeds/fun.embed';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Lanza dados')
    .addIntegerOption((option) =>
      option
        .setName('dados')
        .setDescription('Cantidad de dados (1-10)')
        .setMinValue(1)
        .setMaxValue(10)
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName('caras')
        .setDescription('Cantidad de caras por dado')
        .setMinValue(2)
        .setMaxValue(100)
        .setRequired(false)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const amount = interaction.options.getInteger('dados') || 1;
    const sides = interaction.options.getInteger('caras') || 6;

    const results = FunService.rollDice(amount, sides);
    const embed = createDiceEmbed(results, sides);

    await interaction.reply({ embeds: [embed] });
  },
};

export default command;
