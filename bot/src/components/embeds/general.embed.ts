import { EmbedBuilder, User, GuildMember } from 'discord.js';
import type { GuildStats } from '@/types';

/**
 * Genera el Embed con la información del servidor.
 */
export const createServerInfoEmbed = (stats: GuildStats, requestedBy: User) => {
  return new EmbedBuilder()
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
    .setFooter({ text: `Hikari.ts - Solicitado por ${requestedBy.username}` })
    .setTimestamp();
};

/**
 * Genera el Embed con el estado de la API.
 */
export const createStatusEmbed = (statusMessage: string) => {
  return new EmbedBuilder()
    .setTitle('Estado del Sistema')
    .setDescription(statusMessage)
    .setColor(statusMessage.includes('✅') ? 0x00ff00 : 0xff0000)
    .setTimestamp();
};

/**
 * Genera el Embed con la información detallada del usuario/miembro.
 */
export const createUserInfoEmbed = (user: User, member: GuildMember | null) => {
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
      }
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
      }
    );
  }

  return embed;
};

/**
 * Genera el Embed para mostrar el avatar de un usuario.
 */
export const createAvatarEmbed = (user: User) => {
  return new EmbedBuilder()
    .setTitle(`Avatar de ${user.username}`)
    .setImage(user.displayAvatarURL({ size: 1024 }))
    .setColor(0x2b2d31)
    .setFooter({ text: 'Hikari.ts' })
    .setTimestamp();
};
