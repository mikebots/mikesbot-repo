const db = require('quick.db')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "setsuggestions",
    description: "Set the suggestions channel in order to use the suggestions command!",
    aliases: ['sugchan', 'suggestionschannel'],
    usage: "[p]setsuggestions <Channel Mention, ID>",
    category: "configuration",
    run: async(bot, message, args)=>{
        var channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name === `${args[0]}`)
        if(!message.member.permissions.has("MANAGE_CHANNELS")){
            return message.channel.send("You need to be able to manage channels in order to use this command!")
        }
        if(!args[0]) {
            return message.channel.send("Please mention a channel or provide a valid channel id/name")

        }channel.createWebhook(bot.user.username, bot.user.displayAvatarURL())
        await db.set(`suggestchan_${message.guild.id}`, channel.id)
        
        message.channel.send(`Succesfully set the suggestions channel to <#${channel.id}>`)
        var embed = new MessageEmbed()
            .setTitle("Suggestions Channel Set")
            .setDescription("Suggestions will be sent to this channel from now on")
            .setFooter(`Suggestions Bot, Powered by Mike H.`)
            .setColor(`GREEN`)
            .setTimestamp()
        channel.send(embed)
    }
}