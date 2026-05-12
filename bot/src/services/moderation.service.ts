import { GuildMember, TextChannel } from 'discord.js';

/**
 * Servicio encargado de la lógica de moderación del servidor.
 */
export const ModerationService = {
  /**
   * Borra una cantidad específica de mensajes de un canal.
   */
  async clearMessages(channel: TextChannel, amount: number) {
    if (amount < 1 || amount > 100) {
      throw new Error('La cantidad de mensajes debe estar entre 1 y 100.');
    }
    const deleted = await channel.bulkDelete(amount, true);
    return deleted.size;
  },

  /**
   * Expulsa a un miembro del servidor.
   */
  async kickMember(member: GuildMember, reason: string) {
    if (!member.kickable) {
      throw new Error('No tengo permisos suficientes para expulsar a este usuario.');
    }
    await member.kick(reason);
  },

  /**
   * Banea a un miembro del servidor.
   */
  async banMember(member: GuildMember, reason: string, deleteMessageDays: number = 0) {
    if (!member.bannable) {
      throw new Error('No tengo permisos suficientes para banear a este usuario.');
    }
    await member.ban({ reason, deleteMessageSeconds: deleteMessageDays * 24 * 60 * 60 });
  },

  /**
   * Aplica un timeout (aislamiento) a un miembro.
   */
  async timeoutMember(member: GuildMember, durationMs: number, reason: string) {
    if (!member.moderatable) {
      throw new Error('No puedo moderar a este usuario (puede que tenga un rol superior).');
    }
    await member.timeout(durationMs, reason);
  },
};

export default ModerationService;
