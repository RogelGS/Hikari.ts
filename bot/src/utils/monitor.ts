import * as Sentry from '@sentry/bun';
import config from '@/utils/config';

/**
 * Inicializa Sentry para el monitoreo de errores técnicos.
 */
export function initMonitoring() {
  const dsn = config.SENTRY_DSN;

  if (dsn) {
    Sentry.init({
      dsn: dsn,
      // TracesSampleRate determina el porcentaje de transacciones capturadas para monitoreo de performance.
      tracesSampleRate: 1.0,
    });
    console.log('[MONITOR] Sentry inicializado correctamente.');
  } else {
    console.warn('[MONITOR] SENTRY_DSN no encontrada. Sentry está desactivado.');
  }
}

/**
 * Reporta un error tanto a Sentry como a Discord vía Webhook.
 * @param error El error capturado.
 * @param context Contexto adicional (ej: nombre del comando).
 */
export async function reportError(error: unknown, context?: string) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : 'No stack trace available';

  // 1. Log en consola
  console.error(`[ERROR] ${context ? `[${context}] ` : ''}${errorMessage}`);

  // 2. Reportar a Sentry
  if (config.SENTRY_DSN) {
    Sentry.captureException(error, {
      extra: { context },
    });
  }

  // 3. Reportar a Discord vía Webhook
  const webhookUrl = config.ERROR_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const formData = new FormData();

      const embed = {
        title: '❌ Error Detectado',
        color: 0xff0000,
        fields: [
          { name: 'Contexto', value: context || 'Global/Desconocido', inline: true },
          { name: 'Mensaje', value: `\`\`\`${errorMessage.substring(0, 500)}\`\`\`` },
        ],
        timestamp: new Date().toISOString(),
      };

      // Si la traza es corta, la ponemos en un campo. Si es larga, la enviamos como archivo.
      if (errorStack && errorStack.length < 900) {
        embed.fields.push({ name: 'Stack Trace', value: `\`\`\`${errorStack}\`\`\`` });
      } else {
        const fileContent = errorStack || 'No stack trace available';
        const blob = new Blob([fileContent], { type: 'text/plain' });
        formData.append('files[0]', blob, 'stacktrace.txt');
        embed.fields.push({
          name: 'Stack Trace',
          value: '📄 Adjunto como archivo (demasiado largo)',
        });
      }

      formData.append('payload_json', JSON.stringify({ embeds: [embed] }));

      // Usamos fetch (nativo en Bun) para enviar el FormData fácilmente
      await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });
    } catch (webhookError) {
      console.error(
        '[MONITOR] Error enviando reporte al Webhook de Discord:',
        (webhookError as Error).message,
      );
    }
  }
}
