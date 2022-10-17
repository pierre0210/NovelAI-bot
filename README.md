# NovelAI-bot

## Features
Using NovelAi API, `NovelAI-bot` a discord bot that can generate images according to given tags, resolution, and model.

## Setup
### Using Node.js v18.7.0
```
npm install
npm run build
npm start
```
### Fill up `.env` and `config.json` under `prod` folder
```
If you want to register the commands as global, just change the boolean of "IsGlobal" into true.
If you want to register them as guild commands, don't forget to fill in your guild ID.
```
## Usage
```
npm start
```
### The Commands
- **/ping** : get websocket latency
- **/generate** : generate image\
<img src='https://media.discordapp.net/attachments/1029763983978278993/1031576804483420170/unknown.png'>\
Fill the included and excluded tags in the first two rows(required). You can also customize resolution and model(not necessary, the defaults are shown on the placeholders).

## Future Features
- **SQLite** : We will add a database to monitor the usage of each guild member.
- **Language Option** : The default language is `Traditional Chinese(Taiwan)`. We will add `English` and `日本語` options soon.

## Credits
- **Pierre** - Main developer
- **蒼アオ** - Co-developer