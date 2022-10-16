import { Interaction } from "discord.js";
import { ClientExtension } from "../interfaces/clientExtension";
import { processInteraction } from "../modals/generate";

export const interactionCreate = async (interaction: Interaction, client: ClientExtension) => {
	if(interaction.isCommand()) {
		const command = client.commands.find((cmd) => cmd.data.name === interaction.commandName);
		if(!command) {
			await interaction.reply({ content: "No such command", ephemeral: true });
		}
		else {
			await command.run(client, interaction);
		}
	}
	else if(interaction.isModalSubmit()) {
		if(interaction.customId == "generate") {
			processInteraction(interaction, client);
		}
	}
}