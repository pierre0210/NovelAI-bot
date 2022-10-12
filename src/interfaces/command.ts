import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { ClientExtension } from "./clientExtension";

export interface Command {
	data: SlashCommandBuilder;
	run: (client: ClientExtension, interaction: CommandInteraction) => Promise<void>;
}