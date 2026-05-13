import axios from 'axios';

export interface MemeResponse {
  postLink: string;
  subreddit: string;
  title: string;
  url: string;
  nsfw: boolean;
  author: string;
  ups: number;
}

/**
 * Obtiene un meme aleatorio de Reddit.
 */
export async function fetchRandomMeme(subreddit: string = 'memes'): Promise<MemeResponse> {
  const response = await axios.get<MemeResponse>(`https://meme-api.com/gimme/${subreddit}`);
  return response.data;
}

import { TranslateService } from '@/services/translate.service';

/**
 * Obtiene un chiste aleatorio (AHORA: Desde API en inglés + Traducción).
 */
export async function fetchRandomJoke(): Promise<string> {
  // Obtenemos un chiste de alta calidad en inglés
  const response = await axios.get('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' },
  });

  const englishJoke = response.data.joke;

  // Lo traducimos al español
  const spanishJoke = await TranslateService.translateToSpanish(englishJoke);

  return spanishJoke;
}

/**
 * Obtiene una imagen aleatoria de un gato.
 */
export async function fetchRandomCat(): Promise<string> {
  const response = await axios.get('https://api.thecatapi.com/v1/images/search');
  return response.data[0].url;
}

/**
 * Obtiene una imagen aleatoria de un perro.
 */
export async function fetchRandomDog(): Promise<string> {
  const response = await axios.get('https://dog.ceo/api/breeds/image/random');
  return response.data.message;
}
