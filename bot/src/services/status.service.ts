import { getApiStatus, type ApiStatusResponse } from '@/api/status.api';

/**
 * Servicio encargado de la lógica relacionada con el estado del sistema.
 */
export const StatusService = {
  /**
   * Obtiene y formatea el estado de la API para ser mostrado en Discord.
   */
  async checkHealth(): Promise<string> {
    try {
      const data: ApiStatusResponse = await getApiStatus();
      return `✅ **API Online**\n**Mensaje:** ${data.message}\n**Versión:** ${data.version}\n**Status:** ${data.status}`;
    } catch (error) {
      // Re-lanzamos para que el comando o el monitor lo manejen si es necesario
      throw new Error('No se pudo conectar con la API de Spring Boot. ¿Está encendida?');
    }
  },
};

export default StatusService;
