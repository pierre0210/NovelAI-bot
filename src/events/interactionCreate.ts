import { Interaction } from "discord.js";
import { ClientExtension } from "../interfaces/clientExtension";
import { processInteraction } from "../modals/generate";
import { I18n } from "../i18n";

export const interactionCreate = async (interaction: Interaction, client: ClientExtension) => {
  const i18n = new I18n();
  if(interaction.isCommand()) {
    const command = client.commands.find((cmd) => cmd.data.name === interaction.commandName);
    if(!command) {
      await interaction.reply({ content: i18n.translate("指令不存在"), ephemeral: true });
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