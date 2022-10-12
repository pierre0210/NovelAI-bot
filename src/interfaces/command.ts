import { SlashCommandBuilder, CommandInteraction, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { ClientExtension } from "./clientExtension";

export interface Command {
	data: Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">| SlashCommandSubcommandsOnlyBuilder;
	run: (client: ClientExtension, interaction: CommandInteraction) => Promise<void>;
}