require('dotenv').config();

module.exports=async(bot)=>{
   

    const current = new Date();
    const giveaways = await Giveaway.find({
        endsOn: { $gt: current }
    });
    await scheduleGiveaways(bot, giveaways);
    database.then(()=> console.log("Connected to MongoDB")).catch(err => console.log(err));
    
   bot.user.setActivity(`${bot.users.cache.size} users | ${process.env.PREFIX}help`, {type: "STREAMING"}, {url: "https://discord.gg/kugRv6Y"});

   
   
   
   
    console.log(`${bot.user.tag} is online and has loaded\n${bot.commands.size} commands\nBot ping is ${bot.ws.ping}ms\nRun ${process.env.PREFIX}help for any command help`)
}
