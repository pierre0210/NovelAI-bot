import { ModalSubmitInteraction, Client, TextChannel, EmbedBuilder, AttachmentBuilder } from "discord.js";
import { novelAI } from "../novelAI/novelAI";
import fs from "fs";

async function processInteraction(interaction: ModalSubmitInteraction, client: Client) {
	await interaction.deferUpdate();
    let n_samples: number = 1;
	let scale: number = 11;
	let steps: number = 28;
	//let ucPreset: number = 0;
	const sampler: string = 'ddim';
	
	const ai = new novelAI();
    const input = interaction.fields.getTextInputValue('include');
	const res = interaction.fields.getTextInputValue('resolution') ? interaction.fields.getTextInputValue('resolution') : 'Portrait (Normal): 512x768';
    const model = interaction.fields.getTextInputValue('model') ? interaction.fields.getTextInputValue('model') : 'NAI Diffusion Anime (Curated)';
	const uc = interaction.fields.getTextInputValue('exclude');
	const paths = await ai.generateImage(input, n_samples, model, res, scale, sampler, steps, uc);

	const file = new AttachmentBuilder(paths[0]);

    const result = new EmbedBuilder().setColor(0x176935).addFields(
        {
            name: '輸入標籤', value: "```\n" + input + "\n```"
        },{
            name: '避開標籤', value: "```\n" + uc + "\n```"
        }
    ).setFooter({text: interaction.user.tag});
	const channel = client.channels.cache.get(interaction.channelId as string) as TextChannel;
	await channel.send({ embeds:[result], files: [file] });
    //await interaction.deferReply();
    //await interaction.followUp({ embeds:[result], files: [file] });
	fs.unlinkSync(paths[0]);
}

export { processInteraction };