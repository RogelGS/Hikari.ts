import axios from 'axios';
import config from '@/utils/config';

/**
 * Instancia de Axios configurada para la API de Spring Boot.
 */
export const apiClient = axios.create({
  baseURL: config.API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
