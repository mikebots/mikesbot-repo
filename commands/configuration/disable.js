const db = require(`quick.db`)

module.exports = {
    name: "disable",
    description: "Disable a command",
    usage: "[p]disable <Command>",
    category: "configuration",
    run: async(bot, message, args)=>{
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`You need to be a server admin in order to disable a command.`)
        if(args[0] && bot.commands.has(args[0])){
            let discheck = db.get(`enabled_${message.guild.id}_${args[0]}`)
            if(discheck==true) {
                db.set(`disabled_${message.guild.id}_${args[0]}`, true)
                db.set(`enabled_${message.guild.id}_${args[0]}`, false)
                message.channel.send(`Succesfully disabled **${args[0]}** !`)
            }  else if(discheck==false) {
                message.channel.send(`This command isn\'t enabled!`)
            }
        } else {
            message.channel.send(`No command found for: **${args[0].toLowerCase()}**`)
        }
    }
}