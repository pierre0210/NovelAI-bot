import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/command";
import { I18n } from "../i18n";
const i18n = new I18n();

export const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping").setDescription(i18n.translate("取得延遲")),
  
  run: async (client, interaction) => {
    const pingEmbed = new EmbedBuilder().setColor(0x176935)
      .setDescription("```\n"+`${i18n.translate("Websocket 延遲")}: ${client.ws.ping} ms`+"\n```");
    await interaction.reply({ embeds: [pingEmbed] });
  },
};