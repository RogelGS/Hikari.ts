import apiClient from './client.api';

export interface ApiStatusResponse {
  status: string;
  message: string;
  version: string;
}

/**
 * Obtiene el estado de la API de Spring Boot.
 */
export async function getApiStatus(): Promise<ApiStatusResponse> {
  const response = await apiClient.get<ApiStatusResponse>('/api/v1/status');
  return response.data;
}
