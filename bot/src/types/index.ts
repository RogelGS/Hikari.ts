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
