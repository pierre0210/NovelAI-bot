import { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder, ModalActionRowComponentBuilder } from "discord.js";
import { Command } from "../interfaces/command";
import { I18n } from "../i18n";
const i18n = new I18n();

export const generate: Command = {
	data: new SlashCommandBuilder()
		.setName("generate")
		.setDescription(i18n.translate("產生圖片")),
	
	run: async (client, interaction) => {
        const modal = new ModalBuilder()
            .setCustomId('generate')
            .setTitle(i18n.translate('產生圖片'));

		

		const includedTags = new TextInputBuilder()
			.setCustomId('include').setLabel(i18n.translate('輸入標籤')).setStyle(TextInputStyle.Paragraph).setRequired(true);
		const excludedTags = new TextInputBuilder()
			.setCustomId('exclude').setLabel(i18n.translate('避開標籤')).setStyle(TextInputStyle.Paragraph).setRequired(true);
		const resolutionInput = new TextInputBuilder()
			.setCustomId('resolution').setLabel(i18n.translate('畫質與形狀/比例')).setStyle(TextInputStyle.Paragraph).setPlaceholder('Portrait (Normal): 512x768').setRequired(false);
		const modelType = new TextInputBuilder()
			.setCustomId('model').setLabel(i18n.translate('演算模式')).setStyle(TextInputStyle.Paragraph).setPlaceholder('NAI Diffusion Anime (Curated)').setRequired(false);
		/*const resolutionInput = new SelectMenuBuilder().setCustomId('resolution').setPlaceholder("Portrait (Normal): 512x768").addOptions(
			{
				label: "Portrait (Normal): 512x768",
				description: "Portrait (Normal): 512x768",
				value: "Portrait (Normal): 512x768",
			},{
				label: "Landscape (Normal): 768x512",
				description: "Landscape (Normal): 768x512",
				value: "Landscape (Normal): 768x512",
			},{
				label: "Square (Normal): 640x640",
				description: "Square (Normal): 640x640",
				value: "Square (Normal): 640x640",
			},{
				label: "Portrait (Small): 384x640",
				description: "Portrait (Small): 384x640",
				value: "Portrait (Small): 384x640",
			},{
				label: "Landscape (Small): 640x384",
				description: "Landscape (Small): 640x384",
				value: "Landscape (Small): 640x384",
			},{
				label: "Square (Small): 512x512",
				description: "Square (Small): 512x512",
				value: "Square (Small): 512x512",
			},
		);*/
		//currently not supported by discord.js

		const actionRow1 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(includedTags);
		const actionRow2 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(excludedTags);
		const actionRow3 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(resolutionInput);
		const actionRow4 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(modelType);
		modal.addComponents(actionRow1, actionRow2, actionRow3, actionRow4);
		
		await interaction.showModal(modal);
	}
}