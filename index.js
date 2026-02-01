const { AoiClient, LoadCommands, CustomEvent } = require('aoi.js');
const { Database } = require('aoi.mongo');
const fs = require('node:fs');
const customFunctions = fs.readdirSync('./handler/functions');
const { Webhook } = require('@top-gg/sdk');
const app = require('express')();
require('dotenv').config();

//Client Setup
const arox = new AoiClient({
  token: process.env.BOT_TOKEN,
  prefix: ["a!", "$getGuildVar[prefix;$guildID;main]"],
  intents: [
    'MessageContent',
    'Guilds',
    'GuildMembers',
    'GuildMessages',
    'GuildVoiceStates',
    'GuildIntegrations',
    'GuildWebhooks',
    'GuildInvites',
  ],
  events: [
    'onGuildJoin',
    'onGuildLeave',
    'onMessage',
    'onInteractionCreate',
    'onVariableCreate',
    'onVariableDelete',
    'onVariableUpdate',
    'onFunctionError',
  ],
  disableAoiDB: true,
  disableFunctions: ['$clientToken'],
  suppressAllErrors: true,
  errorMessage: '**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!]',
});

//Database Setup
const database = new Database(arox, {
  url: process.env.MONGODB_URL,
  tables: ['main', 'important'],
  logging: true
});

//Command Loader
arox.loadCommands('./commands/', true);

//Variable Loader
require('./handler/variables/main.js')(arox);
require('./handler/variables/important.js')(arox);

//Custom Function Loader
customFunctions.forEach((file) => {
  require(`./handler/functions/${file}`)(arox);
});

//Top.gg Trigger
const webhook = new Webhook(process.env.TOPGG_TOKEN);
const event = new CustomEvent(arox);
event.command({
  listen: 'vote',
  code: `
$awaitExecute[topggVoteMsg]
$awaitExecute[topggVote]
$let[authorID;$djsEval[d.data.eventData[0].user;true]]
  `,
});
event.listen('vote');

app.post('/vote',
  webhook.listener((vote) => {
    event.emit('vote', vote);
  }),
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`I'm now running on port ${process.env.PORT || 3000}.`);
});

//Bot Status
arox.status(
  {
    name: 'a!help | Reach the available commands!',
    time: 5,
    type: 'CUSTOM',
  },
  {
    name: 'a!stockmarket | Dive into the stock market!',
    time: 3,
    type: 'CUSTOM',
  },
  {
    name: 'a!professions | Work in professions!',
    time: 3,
    type: 'CUSTOM',
  },
  {
    name: 'a!shop | Shop in the virtual market!',
    time: 3,
    type: 'CUSTOM',
  },
);
