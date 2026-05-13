import { fetchRandomMeme, type MemeResponse } from '@/api/fun.api';

/**
 * Servicio encargado de la lógica de entretenimiento.
 */
export const FunService = {
  /**
   * Obtiene una respuesta aleatoria para el comando 8ball.
   */
  get8BallResponse(): string {
    const responses = [
      'En mi opinión, sí.',
      'Es cierto.',
      'Es decididamente así.',
      'Probablemente.',
      'Buen pronóstico.',
      'Todo apunta a que sí.',
      'Sin duda.',
      'Sí.',
      'Sí, definitivamente.',
      'Debes confiar en ello.',
      'Respuesta vaga, intenta otra vez.',
      'Pregunta en otro momento.',
      'Mejor no decirte ahora.',
      'No puedo predecirlo ahora.',
      'Concéntrate y pregunta otra vez.',
      'No cuentes con ello.',
      'Mi respuesta es no.',
      'Mis fuentes dicen que no.',
      'Las perspectivas no son buenas.',
      'Muy dudoso.',
    ];
    return responses[Math.floor(Math.random() * responses.length)]!;
  },

  /**
   * Obtiene un meme y filtra si es NSFW.
   */
  async getMeme(subreddit?: string): Promise<MemeResponse> {
    const meme = await fetchRandomMeme(subreddit);
    if (meme.nsfw) {
      // Si por alguna razón sale algo NSFW, intentamos otra vez o lanzamos error
      return this.getMeme(subreddit);
    }
    return meme;
  },

  /**
   * Lanza una moneda.
   */
  flipCoin(): 'Cara' | 'Cruz' {
    return Math.random() < 0.5 ? 'Cara' : 'Cruz';
  },

  /**
   * Lanza dados.
   */
  rollDice(amount: number, sides: number): number[] {
    const results: number[] = [];
    for (let i = 0; i < amount; i++) {
      results.push(Math.floor(Math.random() * sides) + 1);
    }
    return results;
  },
};

export default FunService;
