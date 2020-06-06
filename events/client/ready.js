require('dotenv').config();

module.exports=async(bot)=>{
   
   
   
   
    bot.user.setActivity(`${bot.users.cache.size} users | ${process.env.PREFIX}help`, {type: "STREAMING"});
    console.log(`${bot.user.tag} is online and has loaded\n${bot.commands.size} commands\nBot ping is ${bot.ws.ping}ms\nRun ${process.env.PREFIX}help for any command help`)
}
