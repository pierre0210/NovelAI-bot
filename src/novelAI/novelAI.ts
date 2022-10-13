import axios from "axios";

class novelAI {
	url: string;
	resolutions: string[];
	models: any;
	samplers: string[];

	input: string;
	numberOfPics: number;
	model: string;
	resolution: string;
	scale: number;
	sampler: string;
	steps: number;
	ucPreset: number;
	uc: string;

	constructor(input: string, numberOfPics: number, model: string, resolution: string, scale: number, sampler: string, steps: number, ucPreset: number, uc: string) {
		this.url = "api.novelai.net";
		
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
		this.numberOfPics = numberOfPics;
		this.model = this.models[model];
		this.resolution = resolution;
		this.scale = scale;
		this.sampler = sampler;
		this.steps = steps;
		this.ucPreset = ucPreset;
		this.uc = uc;
	}

	public async generateImage() {
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
                "number": this.numberOfPics,
                "model": this.model,
                "resolution": this.resolution,
                "scale": this.scale,
                "sampler": this.sampler,
                "steps": this.steps,
                "ucPreset": this.ucPreset,
                "uc": this.uc
            }
		})
	}
}

export { novelAI };