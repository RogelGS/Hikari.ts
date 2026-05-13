import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import type { Command } from '@/types';
import { createSlapEmbed } from '@/components/embeds/fun.embed';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('slap')
    .setDescription('Dale una bofetada a un usuario')
    .addUserOption((option) =>
      option.setName('objetivo').setDescription('El usuario al que quieres abofetear').setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getMember('objetivo') as GuildMember;

    if (!target) {
      await interaction.reply({ content: '❌ No se pudo encontrar a ese usuario.', ephemeral: true });
      return;
    }

    const embed = createSlapEmbed(interaction.user, target.user);
    await interaction.reply({ embeds: [embed] });
  },
};

export default command;
