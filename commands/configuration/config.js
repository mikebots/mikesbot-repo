const db = require("quick.db")

module.exports={
    name: "configall",
    run: async(bot,message,args)=>{
        var botApp = await bot.fetchApplication()
        var owner = botApp.owner.id
        if(message.author.id !== owner) return;
        bot.commands.forEach(command=>{
            bot.guilds.cache.forEach(guild=>{
                db.delete(`enabled_${guild.id}_${command.name}`)
                db.delete(`enabled_${guild.id}_${command.name}`)
                db.set(`enabled_${guild.id}_${command.name}`, true)
                db.set(`disabled_${guild.id}_${command.name}`, false)
                console.log(`Enabled ${command.name} in ${guild.name}`)
            })
        })
    }
}