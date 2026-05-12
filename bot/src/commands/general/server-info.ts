import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from 'discord.js';
import type { Command } from '@/types';
import DiscordService from '@/services/discord.service';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('server-info')
    .setDescription('Muestra estadísticas detalladas del servidor'),
  async execute(interaction: ChatInputCommandInteraction) {
    const { guild } = interaction;

    if (!guild) {
      await interaction.reply({
        content: 'Este comando solo puede usarse en un servidor.',
        ephemeral: true,
      });
      return;
    }

    const stats = DiscordService.getGuildStats(guild);

    const embed = new EmbedBuilder()
      .setTitle(`Estadísticas de ${stats.name}`)
      .setThumbnail(stats.iconURL)
      .setColor(0x5865f2)
      .addFields(
        { name: '🆔 ID', value: stats.id, inline: true },
        { name: '👑 Dueño', value: `<@${stats.ownerId}>`, inline: true },
        { name: '👥 Miembros', value: stats.memberCount.toString(), inline: true },
        {
          name: '📅 Creado el',
          value: `<t:${Math.floor(stats.createdTimestamp / 1000)}:D>`,
          inline: true,
        },
        { name: '🚀 Nivel de Boost', value: stats.premiumTier.toString(), inline: true },
        { name: '🛡️ Verificación', value: stats.verificationLevel.toString(), inline: true }
      )
      .setFooter({ text: `Hikari.ts - Solicitado por ${interaction.user.username}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

export default command;
