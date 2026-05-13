import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  GuildMember,
  MessageFlags,
} from 'discord.js';
import type { Command } from '@/types';
import ModerationService from '@/services/moderation.service';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banea a un miembro del servidor')
    .addUserOption((option) =>
      option.setName('objetivo').setDescription('El usuario que quieres banear').setRequired(true),
    )
    .addStringOption((option) =>
      option.setName('razon').setDescription('La razón del baneo').setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName('borrar_mensajes')
        .setDescription('Días de mensajes a borrar (0-7)')
        .setMinValue(0)
        .setMaxValue(7)
        .setRequired(false),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),
  async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getMember('objetivo') as GuildMember;
    const reason = interaction.options.getString('razon') || 'No se especificó una razón.';
    const days = interaction.options.getInteger('borrar_mensajes') || 0;

    if (!target) {
      await interaction.reply({
        content: '❌ No se pudo encontrar a ese miembro.',
        flags: [MessageFlags.Ephemeral],
      });
      return;
    }

    try {
      await ModerationService.banMember(target, reason, days);
      await interaction.reply({
        content: `✅ **${target.user.tag}** ha sido baneado permanentemente.\n**Razón:** ${reason}`,
      });
    } catch (error) {
      await interaction.reply({
        content: `❌ ${error instanceof Error ? error.message : 'Error al intentar banear al usuario.'}`,
        flags: [MessageFlags.Ephemeral],
      });
    }
  },
};

export default command;
