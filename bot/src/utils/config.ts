import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config();

/**
 * Utilidad de configuración centralizada.
 * Valida y exporta las variables de entorno con tipado fuerte.
 */
export const config = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN || '',
  CLIENT_ID: process.env.CLIENT_ID || '',
  GUILD_ID: process.env.GUILD_ID || '',
  API_URL: process.env.API_URL || 'http://localhost:8080',
  SENTRY_DSN: process.env.SENTRY_DSN || '',
  ERROR_WEBHOOK_URL: process.env.ERROR_WEBHOOK_URL || '',
};

// Validación de variables críticas
const requiredKeys: (keyof typeof config)[] = ['DISCORD_TOKEN', 'CLIENT_ID', 'GUILD_ID'];

for (const key of requiredKeys) {
  if (!config[key]) {
    console.error(`❌ [CONFIG] Error: La variable de entorno ${key} es obligatoria.`);
    process.exit(1);
  }
}

export default config;
