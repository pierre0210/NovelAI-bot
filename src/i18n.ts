import path from "path";
import zhtw from "./locals/zh-tw.json";
import en from "./locals/en.json";
import jp from "./locals/jp.json";

const configFilePath = path.join(process.cwd(), "prod", "config.json");

class I18n {
  local: any;
  constructor() {
    const config = require(configFilePath);
    
    switch(config.Language as string) {
      case "en":
        this.local = en;
        break;
      case "jp":
        this.local = jp;
        break;
      default:
        this.local = zhtw;
        break;
    }
  }

  public translate(text: string): string {
    const result = this.local[text] ? this.local[text] : text;
    return result;
  }
}

export { I18n };