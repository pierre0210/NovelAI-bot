# NovelAI-bot

![](https://img.shields.io/github/issues/pierre0210/NovelAI-bot)
![](https://img.shields.io/github/stars/pierre0210/NovelAI-bot)
![](https://img.shields.io/github/forks/pierre0210/NovelAI-bot)

## Features
Using NovelAi API, `NovelAI-bot` a discord bot that can generate images according to given tags, resolution, and model.\
Currently supports `Traditional Chinese(Taiwan)`, `English` and `日本語`.
## Setup
### Using Node.js v18.7.0
```
npm install
npm run build
npm start
```
### Fill up `.env` and `config.json` under `prod` folder
If you want to register the commands as global, just change the boolean of "IsGlobal" into true.\
If you want to register them as guild commands, don't forget to fill in your guild ID.\
Configure the "Language" part by filling in "en" or "jp", the default language is "zhtw".

### Using Docker
Docker is also a possible way to run this bot, please make sure you have filled the `.env` file and placed it under root directory.
```
docker image build -t novelai-bot
docker container run --name novelai -d novelai-bot
```
## Usage
```
npm start
```
### The Commands
- **/ping** : get websocket latency
- **/generate** : generate image\
<img src='https://media.discordapp.net/attachments/1029763983978278993/1031576804483420170/unknown.png'>\
Fill the included and excluded tags in the first two rows(required). You can also customize resolution and model(not necessary, the defaults are shown on the placeholders)\
model options: `NAI Diffusion Anime (Curated)`, `NAI Diffusion Anime (Full)`, `NAI Diffusion Furry (Beta)`

## Future Features
- **SQLite** : We will add a database to monitor the usage of each guild member.

## Credits
- **Pierre** - Main developer. API request & file structure.
- **蒼アオ** - Co-developer. Discord commands and modal, Japanese translation.
