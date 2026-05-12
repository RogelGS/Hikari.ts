import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  GuildMember,
} from 'discord.js';
import type { Command } from '@/types';
import ModerationService from '@/services/moderation.service';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Silencia temporalmente a un miembro')
    .addUserOption((option) =>
      option.setName('objetivo').setDescription('El miembro a silenciar').setRequired(true),
    )
    .addIntegerOption(
      (option) =>
        option
          .setName('duracion')
          .setDescription('Duración del silencio en minutos')
          .setRequired(true)
          .setMinValue(1)
          .setMaxValue(40320), // 28 días máximo
    )
    .addStringOption((option) =>
      option.setName('razon').setDescription('La razón del silencio').setRequired(false),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),
  async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getMember('objetivo') as GuildMember;
    const durationMin = interaction.options.getInteger('duracion', true);
    const reason = interaction.options.getString('razon') || 'No se especificó una razón.';

    if (!target) {
      await interaction.reply({
        content: '❌ No se pudo encontrar a ese miembro.',
        ephemeral: true,
      });
      return;
    }

    try {
      await ModerationService.timeoutMember(target, durationMin * 60 * 1000, reason);
      await interaction.reply({
        content: `✅ **${target.user.tag}** ha sido silenciado por **${durationMin}** minutos.\n**Razón:** ${reason}`,
      });
    } catch (error) {
      await interaction.reply({
        content: `❌ ${error instanceof Error ? error.message : 'Error al intentar silenciar al usuario.'}`,
        ephemeral: true,
      });
    }
  },
};

export default command;
