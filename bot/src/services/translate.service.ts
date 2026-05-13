import axios from 'axios';

/**
 * Servicio para traducir textos de forma gratuita.
 */
export const TranslateService = {
  /**
   * Traduce un texto de inglés a español.
   */
  async translateToSpanish(text: string): Promise<string> {
    try {
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: text,
          langpair: 'en|es',
        },
      });

      return response.data.responseData.translatedText || text;
    } catch (error) {
      console.error('[TRANSLATE] Error al traducir:', error);
      return text; // Si falla, devolvemos el original
    }
  },
};

export default TranslateService;
