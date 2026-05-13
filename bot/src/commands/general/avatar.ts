import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '@/types';
import { createAvatarEmbed } from '@/components/embeds/general.embed';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Muestra el avatar de un usuario')
    .addUserOption((option) =>
      option
        .setName('objetivo')
        .setDescription('El usuario del que quieres ver el avatar')
        .setRequired(false),
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser('objetivo') || interaction.user;
    const embed = createAvatarEmbed(user);

    await interaction.reply({ embeds: [embed] });
  },
};

export default command;
