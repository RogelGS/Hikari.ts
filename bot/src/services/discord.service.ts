import { Guild, GuildMember, User } from 'discord.js';

/**
 * Servicio para abstraer operaciones comunes con la API de Discord.
 */
export const DiscordService = {
  /**
   * Obtiene información detallada de un miembro en un servidor.
   */
  async getMemberInfo(guild: Guild, user: User): Promise<GuildMember | null> {
    try {
      return await guild.members.fetch(user.id);
    } catch {
      return null;
    }
  },

  /**
   * Obtiene estadísticas básicas de un servidor.
   */
  getGuildStats(guild: Guild) {
    return {
      id: guild.id,
      name: guild.name,
      ownerId: guild.ownerId,
      memberCount: guild.memberCount,
      createdTimestamp: guild.createdTimestamp,
      iconURL: guild.iconURL({ size: 1024 }),
      premiumTier: guild.premiumTier,
      verificationLevel: guild.verificationLevel,
    };
  },
};

export default DiscordService;
