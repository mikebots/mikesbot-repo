require('dotenv').config();
const {Collection, Client} = require('discord.js');
const {MessageEmbed} = require('discord.js')
const fs = require('fs');






const bot = new Client({
    partials: ['MESSAGE', 'REACTION']
});
;



bot.commands = new Collection();
bot.queue = new Map();
bot.cachedMessageReactions = new Map();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
["command","event"].forEach(handler=>{
    require(`./handlers/${handler}`)(bot);
});
 bot.login(process.env.BOT_TOKEN)







