import type {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Collection,
  ClientEvents,
} from 'discord.js';

export interface Command {
  data: SlashCommandBuilder | unknown;
  execute: (_interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface GuildStats {
  id: string;
  name: string;
  ownerId: string;
  memberCount: number;
  createdTimestamp: number;
  iconURL: string | null;
  premiumTier: number;
  verificationLevel: number;
}

export interface Event<K extends keyof ClientEvents> {
  name: K;
  once?: boolean;
  execute: (..._args: ClientEvents[K]) => Promise<void> | void;
}

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, Command>;
  }
}
