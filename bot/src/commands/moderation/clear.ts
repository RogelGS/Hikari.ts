import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  TextChannel,
  MessageFlags,
} from 'discord.js';
import type { Command } from '@/types';
import ModerationService from '@/services/moderation.service';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Borra mensajes del canal actual')
    .addIntegerOption((option) =>
      option
        .setName('cantidad')
        .setDescription('Número de mensajes a borrar (1-100)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false),
  async execute(interaction: ChatInputCommandInteraction) {
    const amount = interaction.options.getInteger('cantidad', true);
    const channel = interaction.channel as TextChannel;

    try {
      const deletedCount = await ModerationService.clearMessages(channel, amount);
      await interaction.reply({
        content: `✅ Se han borrado **${deletedCount}** mensajes correctamente.`,
        flags: [MessageFlags.Ephemeral],
      });
    } catch (error) {
      await interaction.reply({
        content: `❌ ${error instanceof Error ? error.message : 'Ocurrió un error al borrar los mensajes.'}`,
        flags: [MessageFlags.Ephemeral],
      });
    }
  },
};

export default command;
