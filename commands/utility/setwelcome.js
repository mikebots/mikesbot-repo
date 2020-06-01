const discord = require('discord.js')
const db = require('quick.db')
module.exports = {
    name: "setwelcome",
    aliases: ['welcomechannel', 'setwelcomechannel'],
    category: "utility",
    description: "Set the welcome channel for your server!",
    usage: "setwelcome <Channel Mention | Channel ID>",
    run: async(bot, message, args)=>{
        let channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first() || message.guild.channels.cache.find(c => c.name === `${args[0]}`)

        if(!channel) return message.channel.send(`Please leave a valid channel mention or id/name!`)

        db.set(`welcomechannel_${message.guild.id}`, channel.id)
        message.channel.send(`Succesfully set all welcome messages to <#${channel.id}> !`)
    }
}