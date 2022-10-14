import axios from "axios";
import fs from "node:fs";
import path from "path";
require("dotenv").config();

class novelAI {
	url: string;
	resolutions: string[];
	models: any;
	samplers: string[];

	input: string;
	model: string;
	resolution: string;
	scale: number;
	sampler: string;
	steps: number;
	n_samples: number;
	ucPreset: number;
	uc: string;

	constructor(input: string, n_samples: number, model: string, resolution: string, scale: number, sampler: string, steps: number, uc: string, ucPreset: number = 0) {
		this.url = "https://api.novelai.net";
		
		this.resolutions = ["Portrait (Normal): 512x768",
			"Landscape (Normal): 768x512",
			"Square (Normal): 640x640",
			"Portrait (Small): 384x640",
			"Landscape (Small): 640x384",
			"Square (Small): 512x512"
		];
		this.models = {
			"NAI Diffusion Anime (Curated)": "safe-diffusion",
			"NAI Diffusion Anime (Full)": "nai-diffusion",
			"NAI Diffusion Furry (Beta)": "nai-diffusion-furry"
		};
		this.samplers = ['k_euler_ancestral', 'k_euler', 'k_lms', 'plms', 'ddim'];

		this.input = input;
		this.model = this.models[model];
		this.resolution = resolution;
		this.scale = scale;
		this.sampler = sampler;
		this.steps = steps;
		this.n_samples = n_samples;
		this.ucPreset = ucPreset;
		this.uc = uc;
	}

	public async generateImage(): Promise<string[]> {
		const response = await axios({
			method: "post",
			baseURL: this.url,
			url: "/ai/generate-image",
			headers: {
                "Content-Type": "application/json",
                "authorization": process.env.NOVELAI_TOKEN,
                "authority": this.url,
                "accept": "/",
                "content-type": "application/json",
                "origin": "https://novelai.net/",
                "referer": "https://novelai.net/"
            },
			data: {
                "input": this.input,
				"model": this.model,
				"parameters": {
					"resolution": this.resolution,
					"scale": this.scale,
					"sampler": this.sampler,
					"steps": this.steps,
					"n_samples": this.n_samples,
					"ucPreset": this.ucPreset,
					"uc": this.uc
				}
            }
		});

		if(response.status == 201) {
			const data = response.data as string;
			let image = data.replace("event: newImage\nid: 1\ndata:", "");
			let imageArr = [];
			for(let i=1; i<=this.n_samples; i++) {
				const imageSplit = image.split(`\nevent: newImage\nid: ${i+1}\ndata:`);
				const buffer = Buffer.from(imageSplit[0], "base64");
				const filename = path.join(process.cwd(), "prod", `${Date.now()}-${i}.png`);
				imageArr.push(filename);
				fs.writeFileSync(filename, buffer);
				image = imageSplit.length == 2 ? imageSplit[1] : "";
			}
			return imageArr;
		}
		else {
			console.log("Error");
			return [];
		}
	}
}

export { novelAI };