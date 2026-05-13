import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  MessageFlags,
} from 'discord.js';
import type { Command } from '@/types';
import DiscordService from '@/services/discord.service';
import { createServerInfoEmbed } from '@/components/embeds/general.embed';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('server-info')
    .setDescription('Muestra estadísticas detalladas del servidor'),
  async execute(interaction: ChatInputCommandInteraction) {
    const { guild } = interaction;

    if (!guild) {
      await interaction.reply({
        content: 'Este comando solo puede usarse en un servidor.',
        flags: [MessageFlags.Ephemeral],
      });
      return;
    }

    const stats = DiscordService.getGuildStats(guild);
    const embed = createServerInfoEmbed(stats, interaction.user);

    await interaction.reply({ embeds: [embed] });
  },
};

export default command;
