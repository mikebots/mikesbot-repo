const {MessageEmbed} = require('discord.js')
module.exports={ //question must be more than 3 characters
    name: "poll",
    aliases: ['p', 'pcreate'],
    usage: "poll <channel> <question>",
    description: "Create a simple poll",
    category: "fun",
    run: async(bot,message,args)=>{
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`You need the Manage Servers permission in order to execute a poll`)
        var channel = message.mentions.channels.first() ||message.guild.channels.cache.get(args[0])
        if(args[0].toLowerCase()=="here") channel = message.channel;
        if(!channel || typeof channel == "undefined") return message.channel.send(`I need a valid channel mention or channel id`)
        
        var question = args.slice(1).join(" ")

        if(!args[1])return message.channel.send("No question Specified. Try ```\npoll <channel mention | channel id> <question>\n```")

        let pollembed = new MessageEmbed()
        pollembed.setTitle(`New poll from ${message.author.tag}`)
        pollembed.setDescription(question)
        pollembed.setColor(`RANDOM`)
        pollembed.setFooter(`Poll bot made by Mike H.`)
        pollembed.setTimestamp()
        let msg = await bot.channels.cache.get(channel.id).send(pollembed)
        await msg.react('👍')
        await msg.react('👎') //emoji reactions: 👍 👎

    }
}