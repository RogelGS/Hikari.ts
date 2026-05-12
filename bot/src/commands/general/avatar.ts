import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '@/types';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Obtiene el avatar de un usuario')
    .addUserOption((option) =>
      option
        .setName('objetivo')
        .setDescription('El usuario del que quieres ver el avatar')
        .setRequired(false),
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser('objetivo') || interaction.user;

    const embed = new EmbedBuilder()
      .setTitle(`Avatar de ${user.username}`)
      .setImage(user.displayAvatarURL({ size: 1024 }))
      .setColor(0x2b2d31)
      .setFooter({ text: `Hikari.ts` });

    await interaction.reply({ embeds: [embed] });
  },
};

export default command;
