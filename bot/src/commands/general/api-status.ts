import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';
import type { Command } from '../../types';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('api-status')
    .setDescription('Verifica la conexión con la API de Spring Boot'),
  async execute(interaction) {
    await interaction.deferReply();

    try {
      // Usamos la URL de la API definida en el .env
      const apiUrl = process.env.API_URL || 'http://localhost:8080';
      const response = await axios.get(`${apiUrl}/api/v1/status`);
      
      const { status, message, version } = response.data;

      await interaction.editReply({
        content: `✅ **API Online**\n**Mensaje:** ${message}\n**Versión:** ${version}\n**Status:** ${status}`
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: '❌ No se pudo conectar con la API de Spring Boot. ¿Está encendida?'
      });
    }
  },
};

export default command;
