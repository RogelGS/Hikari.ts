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
    .setName('kick')
    .setDescription('Expulsa a un miembro del servidor')
    .addUserOption((option) =>
      option
        .setName('objetivo')
        .setDescription('El usuario que quieres expulsar')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option.setName('razon').setDescription('La razón de la expulsión').setRequired(false),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false),
  async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getMember('objetivo') as GuildMember;
    const reason = interaction.options.getString('razon') || 'No se especificó una razón.';

    if (!target) {
      await interaction.reply({
        content: '❌ No se pudo encontrar a ese miembro en este servidor.',
        flags: [MessageFlags.Ephemeral],
      });
      return;
    }

    try {
      await ModerationService.kickMember(target, reason);
      await interaction.reply({
        content: `✅ **${target.user.tag}** ha sido expulsado.\n**Razón:** ${reason}`,
      });
    } catch (error) {
      await interaction.reply({
        content: `❌ ${error instanceof Error ? error.message : 'Error al intentar expulsar al usuario.'}`,
        flags: [MessageFlags.Ephemeral],
      });
    }
  },
};

export default command;
