import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '@/types';
import DiscordService from '@/services/discord.service';
import { createUserInfoEmbed } from '@/components/embeds/general.embed';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('user-info')
    .setDescription('Muestra información detallada sobre un usuario')
    .addUserOption((option) =>
      option
        .setName('objetivo')
        .setDescription('El usuario del que quieres ver la información')
        .setRequired(false),
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser('objetivo') || interaction.user;
    const member = interaction.guild
      ? await DiscordService.getMemberInfo(interaction.guild, user)
      : null;

    const embed = createUserInfoEmbed(user, member);

    await interaction.reply({ embeds: [embed] });
  },
};

export default command;
