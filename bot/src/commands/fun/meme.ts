import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '@/types';
import FunService from '@/services/fun.service';
import { createMemeEmbed } from '@/components/embeds/fun.embed';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Obtiene un meme aleatorio de Reddit')
    .addStringOption((option) =>
      option
        .setName('subreddit')
        .setDescription('El subreddit del cual obtener el meme (opcional)')
        .setRequired(false)
        .addChoices(
          { name: 'Memes en Inglés', value: 'memes' },
          { name: 'Memes en Español', value: 'MemesEnEspanol' },
          { name: 'Dank Memes', value: 'dankmemes' },
          { name: 'Me_IRL', value: 'me_irl' },
          { name: "Memes y mas Memes", value: "MemesymasMemes" },
          { name: "Dank Hispano", value: "DankHispano" },
          { name: "Cursed Comments", value: "CursedComments" },
          { name: "Memes wholesomes", value: "wholesomememes" },
        )
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    try {
      const subreddit = interaction.options.getString('subreddit') || undefined;
      const meme = await FunService.getMeme(subreddit);
      const embed = createMemeEmbed(meme);

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      await interaction.editReply({
        content: '❌ No se pudo obtener ningún meme en este momento. Inténtalo de nuevo más tarde.',
      });
      throw error;
    }
  },
};

export default command;
