import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/command";

export const ping: Command = {
	data: new SlashCommandBuilder()
		.setName("ping").setDescription("Get latency"),
	
	run: async (client, interaction) => {
		const pingEmbed = new EmbedBuilder().setColor(0x176935)
			.setDescription("```\n"+`Websocket latency: ${client.ws.ping} ms`+"\n```");
		await interaction.reply({ embeds: [pingEmbed] });
	}
}