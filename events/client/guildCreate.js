const db = require('quick.db')
module.exports= async(bot, guild)=>{
    
    db.set(`prefix_${guild.id}`, process.env.PREFIX)
    bot.commands.forEach(cmd => {
        db.set(`disabled_${guild.id}_${cmd.name}`, false)
        db.set(`enabled_${guild.id}_${cmd.name}`, true)
    })
    
    console.log(`${bot.user.tag} has now joined ${guild.name} (${guild.id}). And has now activated ${bot.commands.size} commands!/nCommands: ${bot.commands.map(cmd => cmd.name).join("\n")}`)

} 
/* 
*** Enables all commands by default whenver the bot joins a server
*/