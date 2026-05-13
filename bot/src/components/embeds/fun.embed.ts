import { EmbedBuilder, User } from 'discord.js';
import type { MemeResponse } from '@/api/fun.api';

/**
 * Genera el Embed para el comando 8ball.
 */
export const create8BallEmbed = (question: string, answer: string) => {
  return new EmbedBuilder()
    .setTitle('🎱 La Bola 8 Mágica')
    .setColor(0x2b2d31)
    .addFields({ name: 'Pregunta', value: question }, { name: 'Respuesta', value: answer })
    .setTimestamp();
};

/**
 * Genera el Embed para mostrar un meme.
 */
export const createMemeEmbed = (meme: MemeResponse) => {
  return new EmbedBuilder()
    .setTitle(meme.title)
    .setURL(meme.postLink)
    .setImage(meme.url)
    .setColor(0xff4500)
    .setFooter({ text: `Subreddit: r/${meme.subreddit} | 👍 ${meme.ups}` })
    .setTimestamp();
};

/**
 * Genera el Embed para la moneda.
 */
export const createCoinEmbed = (result: string) => {
  return new EmbedBuilder()
    .setTitle('🪙 Lanzamiento de Moneda')
    .setDescription(`¡Ha salido **${result}**!`)
    .setColor(0xffd700)
    .setTimestamp();
};

/**
 * Genera el Embed para los dados.
 */
export const createDiceEmbed = (results: number[], sides: number) => {
  const total = results.reduce((a, b) => a + b, 0);
  return new EmbedBuilder()
    .setTitle(`🎲 Dados de ${sides} caras`)
    .addFields(
      { name: 'Resultados', value: results.join(', ') },
      { name: 'Total', value: total.toString() }
    )
    .setColor(0x3498db)
    .setTimestamp();
};

/**
 * Genera el Embed para un chiste.
 */
export const createJokeEmbed = (joke: string) => {
  return new EmbedBuilder()
    .setTitle('🤡 El Chistoso')
    .setDescription(joke)
    .setColor(0xf1c40f)
    .setTimestamp();
};

/**
 * Genera el Embed para una imagen de animal.
 */
export const createAnimalEmbed = (type: 'Gato' | 'Perro', url: string) => {
  return new EmbedBuilder()
    .setTitle(`📸 ¡Un ${type}!`)
    .setImage(url)
    .setColor(type === 'Gato' ? 0x9b59b6 : 0xe67e22)
    .setTimestamp();
};

/**
 * Genera el Embed para el comando slap.
 */
export const createSlapEmbed = (slapper: User, slapped: User) => {
  const phrases = [
    '¡ZAS! En toda la boca.',
    'Eso ha tenido que doler...',
    '¡Toma castaña!',
    '¡Bofetada legendaria!',
    `Le da una cachetada bien fuerte a ${slapped.username} con la mano abierta`,
    `Le da un sape en la cabeza a ${slapped.username} con la mano abierta`,
    `Le da un combo de bofetadas a ${slapped.username} con la mano abierta`,
    `Le sume la mollera a ${slapped.username}`
  ];
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];

  return new EmbedBuilder()
    .setDescription(`💥 **${slapper.username}** le ha dado una bofetada a **${slapped.username}**`)
    .setFooter({ text: phrase || ' ' })
    .setColor(0xe74c3c)
    .setTimestamp();
};
