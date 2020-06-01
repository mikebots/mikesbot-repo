const db = require('quick.db')
require("dotenv").config()
module.exports = {
    name: "prefix",
    description: "Set a custom prefix for your guild!",
    usage: "[p]prefix <New Prefix>",
    aliases: ['setprefix'],
    category: 'configuration',
    run: async(bot, message, args)=>{
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`You need the **Manage Server** perission in order to change the guild\'s prefix!`)
        var prefix = db.get(`prefix_${message.guild.id}`)
        if(!prefix && prefix==null){
            prefix = process.env.PREFIX
        }
        if(!args[0]) return message.channel.send(`My current prefix here is **${prefix}**\nTo get started type **${prefix}help**`)
        await db.set(`prefix_${message.guild.id}`, args[0].toLowerCase())
        message.channel.send(`The prefix has now been updated to **${args[0]}**`)
    }
}