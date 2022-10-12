import { Client } from "discord.js";
import { Command } from "./command";

export interface ClientExtension extends Client {
	commands: Command[];
}