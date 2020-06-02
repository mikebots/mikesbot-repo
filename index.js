require('dotenv').config();
const {Collection, Client, Discord} = require('discord.js');
const {MessageEmbed} = require('discord.js')
const fs = require('fs');

const {stripIndents} = require('common-tags')




const bot = new Client({
    partials: ['MESSAGE', 'REACTION']
});
const prefix = process.env.PREFIX;
//const database = require('./database/database')
const db = require("quick.db");
(async ()=>{
//await database;

bot.commands = new Collection();
bot.queue = new Map();
bot.cachedMessageReactions = new Map();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
["command","event"].forEach(handler=>{
    require(`./handlers/${handler}`)(bot);
});
await bot.login(process.env.BOT_TOKEN)
})();








