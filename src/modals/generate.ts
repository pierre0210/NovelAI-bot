import { ModalSubmitInteraction, Client, TextChannel, EmbedBuilder, AttachmentBuilder } from "discord.js";
import { novelAI } from "../novelAI/novelAI";
import fs from "fs";
import { I18n } from "../i18n";

async function processInteraction(interaction: ModalSubmitInteraction, client: Client) {
  const i18n = new I18n();
  await interaction.deferUpdate();
  let n_samples: number = 1;
  let scale: number = 11;
  let steps: number = 28;
  //let ucPreset: number = 0;
  const sampler: string = "ddim";
  
  const ai = new novelAI();
  const input = interaction.fields.getTextInputValue("include");
  const res = interaction.fields.getTextInputValue("resolution") ? interaction.fields.getTextInputValue("resolution") : "Portrait (Normal): 512x768";
  const model = interaction.fields.getTextInputValue("model") ? interaction.fields.getTextInputValue("model") : "NAI Diffusion Anime (Curated)";
  const uc = interaction.fields.getTextInputValue("exclude");
  const paths = await ai.generateImage(input, n_samples, model, res, scale, sampler, steps, uc);

  const img = new AttachmentBuilder(paths[0]);
  const channel = client.channels.cache.get(interaction.channelId as string) as TextChannel;
  let attachmentArr = [img];
  const result = new EmbedBuilder().setColor(0x176935);

  if(input.length <= 1024 - 8) {
    result.addFields({ name: i18n.translate("輸入標籤"), value: "```\n" + input + "\n```"});
  }
  else {
    const inputBuffer = Buffer.from(input, "utf-8");
    const inputTxt = new AttachmentBuilder(inputBuffer, { name: "input.txt" });
    attachmentArr.push(inputTxt);
  }

  if(uc.length <= 1024 - 8) {
    result.addFields({ name: i18n.translate("避開標籤"), value: "```\n" + uc + "\n```"});
  }
  else {
    const ucBuffer = Buffer.from(uc, "utf-8");
    const ucTxt = new AttachmentBuilder(ucBuffer, { name: "uc.txt" });
    attachmentArr.push(ucTxt);
  }

  result.setFooter({text: interaction.user.tag});
  await channel.send({ embeds: [result], files: attachmentArr });
    
  //await interaction.deferReply();
  //await interaction.followUp({ embeds:[result], files: [file] });
  fs.unlinkSync(paths[0]);
}

export { processInteraction };