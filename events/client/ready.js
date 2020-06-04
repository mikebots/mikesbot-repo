require('dotenv').config();

module.exports=async(bot)=>{
   
   
   
    bot.channels.cache.get('698780336439558205').send(`${bot.user.username} has restarted and is now online.`)
    bot.user.setActivity(`${bot.users.cache.size} users | ${process.env.PREFIX}help`, {type: "STREAMING"});
    console.log(`${bot.user.tag} is online and has loaded\n${bot.commands.size} commands\nBot ping is ${bot.ws.ping}ms\nRun ${process.env.PREFIX}help for any command help`)
}
