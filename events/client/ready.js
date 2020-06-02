require('dotenv').config();
//const Giveaway = require("../../database/model/Giveaway");
/*const MessageModel = require("../../database/model/message");
const database = require("../../database/database");*/

/*const {scheduleGiveaways } = require("../../utils/structures/giveaway");*/
module.exports=async(bot)=>{
   
    /*const current = new Date();
    const giveaways = await Giveaway.find({
        endsOn: { $gt: current }
    });
    await scheduleGiveaways(bot, giveaways);
    database.then(()=> console.log("Connected to MongoDB")).catch(err => console.log(err));*/
    
    bot.channels.cache.get('698780336439558205').send(`${bot.user.username} has restarted and is now online.`)
    bot.user.setActivity(`${bot.users.cache.size} users | ${process.env.PREFIX}help`, {type: "STREAMING"}, {url: "https://discord.gg/kugRv6Y"});
    console.log(`${bot.user.tag} is online and has loaded\n${bot.commands.size} commands\nBot ping is ${bot.ws.ping}ms\nRun ${process.env.PREFIX}help for any command help`)
}
