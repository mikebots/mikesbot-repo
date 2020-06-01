const {MessageEmbed} = require("discord.js")
const ms = require("ms")
module.exports={
    name: "remind",
    aliases: ['reminde', 'reminder', 'remindeme', 'remind-me', 'remindme'],
    description: "Set a reminder for yourself!",
    usage: "[p]remind <time: format(h,s,m,d,w)> <reminder>",
    category: "fun",
    run: async(bot,message,args)=>{
        const channelID = message.channel.id;
        const channel = message.guild.channels.cache.get(channelID)

        if(!args[0]) return message.channel.send(`Please specify a time`);
        if(!args[1]) return message.channel.send(`Please specify a reminder`);

        if(args[0].endsWith("y")) return message.channel.send(`Your reminder cannot be bigger than 364 days unless you do it manually`)

        const reminder = args.slice(1).join(" ")
        if(reminder.length > 1500) return message.channel.send(`Your reminder cannot be longer than 1500 characters.`)
        var time = Date.now() + ms(args[0]);
        const embed = new MessageEmbed()
        var m = await channel.send(`Reminder set for \`${args[0]}\` from now.`)

        setTimeout(async()=>{
            embed.setDescription(`${reminder}`)
            embed.setColor("RANDOM")

            await channel.send(`Hey <@${message.member.user.id}> reminder`, embed)
        }, ms(args[0]))
    }
}