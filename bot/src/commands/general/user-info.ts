import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '@/types';
import DiscordService from '@/services/discord.service';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('user-info')
    .setDescription('Muestra información detallada sobre un usuario')
    .addUserOption((option) =>
      option
        .setName('objetivo')
        .setDescription('El usuario del que quieres ver la información')
        .setRequired(false),
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser('objetivo') || interaction.user;
    const member = interaction.guild
      ? await DiscordService.getMemberInfo(interaction.guild, user)
      : null;

    const embed = new EmbedBuilder()
      .setTitle(`Información de ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ size: 1024 }))
      .setColor(0x00ae86)
      .addFields(
        { name: '🆔 ID', value: user.id, inline: true },
        { name: '🏷️ Tag', value: user.tag, inline: true },
        {
          name: '📅 Cuenta creada',
          value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`,
          inline: true,
        },
      )
      .setTimestamp();

    if (member) {
      embed.addFields(
        {
          name: '📥 Unión al servidor',
          value: `<t:${Math.floor(member.joinedTimestamp! / 1000)}:R>`,
          inline: true,
        },
        {
          name: '🎭 Roles',
          value: member.roles.cache.map((role) => role.name).join(', ') || 'Ninguno',
        },
      );
    }

    await interaction.reply({ embeds: [embed] });
  },
};

export default command;
