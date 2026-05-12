import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from 'discord.js';
import type { Command } from '@/types';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Muestra la lista de todos los comandos disponibles'),
  async execute(interaction: ChatInputCommandInteraction) {
    const commands = interaction.client.commands;

    const embed = new EmbedBuilder()
      .setTitle('📚 Panel de Ayuda - Hikari.ts')
      .setDescription('Aquí tienes una lista de todos los comandos que puedes utilizar.')
      .setColor(0xffd700)
      .setThumbnail(interaction.client.user?.displayAvatarURL() || null);

    // Agrupamos por carpetas si es posible, o simplemente listamos todos
    // Como no tenemos la categoría guardada en el objeto Command directamente,
    // podemos simplemente listarlos o intentar inferirla si quieres algo más complejo.

    const commandList = commands
      .map((cmd: Command) => {
        const data = cmd.data as SlashCommandBuilder;
        return `\`/${data.name}\` - ${data.description}`;
      })
      .join('\n');

    embed.addFields({
      name: '✨ Comandos Disponibles',
      value: commandList || 'No hay comandos cargbados.',
    });

    embed.setFooter({ text: 'Usa / antes de cada comando' });

    await interaction.reply({ embeds: [embed] });
  },
};

export default command;
