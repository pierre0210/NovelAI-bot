import axios from "axios";
import fs from "node:fs";
import path from "path";
require("dotenv").config();

class novelAI {
  url: string;
  resolutions: string[];
  models: any;
  samplers: string[];

  constructor() {
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
  }

  public async generateImage(input: string, n_samples: number, model: string, resolution: string, scale: number, sampler: string, steps: number, uc: string, ucPreset: number = 0): Promise<string[]> {
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
        "input": input,
        "model": this.models[model],
        "parameters": {
          "resolution": resolution,
          "scale": scale,
          "sampler": sampler,
          "steps": steps,
          "n_samples": n_samples,
          "ucPreset": ucPreset,
          "uc": uc
        }
      }
    });

    if(response.status == 201) {
      const data = response.data as string;
      let image = data.replace("event: newImage\nid: 1\ndata:", "");
      let imageArr = [];
      for(let i=1; i<=n_samples; i++) {
        const imageSplit = image.split(`\nevent: newImage\nid: ${i+1}\ndata:`);
        const buffer = Buffer.from(imageSplit[0], "base64");
        const filename = path.join(process.cwd(), "prod", "tmp", `${Date.now()}-${i}.png`);
        imageArr.push(filename);
        fs.writeFileSync(filename, buffer);
        image = imageSplit.length == 2 ? imageSplit[1] : "";
      }
      return imageArr;
    }
    else {
      console.log(`Error! status code: ${response.status}`);
      return [];
    }
  }
}

export { novelAI };