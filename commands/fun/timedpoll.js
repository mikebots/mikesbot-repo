const {MessageEmbed} = require("discord.js")
const ms = require("ms")

module.exports={
    name: "timedpoll",
    description: "Create a timed poll!",
    usage: "[p]timedpoll <channel mention/id/here> <time: format(h,s,m,d,w)> <question/poll>",
    category: "fun",
    run: async(bot,message,args)=>{
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`You need the \`Manage Server\` permission in order to create a poll.`);

        if(!args[0]) return message.channel.send(`Please specify a channel!`);
        if(!args[1]) return message.channel.send(`Please specify a time!`)
        if(!args[2]) return message.channel.send(`Please specify a question!`)

        var channel = message.guild.channels.cache.find(c=>c.name.startsWith(args[0])) || message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();

        if(args[0].toLowerCase()=="here") channel = message.channel;
          if(!channel || typeof channel == "undefined") return message.channel.send(`I need a valid channel mention or channel id`)
        var question = args.slice(2).join(" ");

        const embed = new MessageEmbed();
        embed.setAuthor(`New Poll from ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
        embed.setDescription(`${question[0].toUpperCase() + question.slice(1)}`)
        embed.setColor("RANDOM");
        embed.setFooter(`This poll ends at: ${args[1]}`);

        var m = await channel.send(embed)
        await m.react("👍")
        await m.react("👎")//emoji reactions: 👍 👎
        setTimeout(async() => {
            var msg = await channel.messages.fetch(m.id)
            if(!msg||msg==null)return;
            var thumbsUp = msg.reactions.cache.get("👍").users.cache.filter(m=>!m.bot).size
            var thumbsDown = msg.reactions.cache.get("👎").users.cache.filter(m=>!m.bot).size;

            var em = new MessageEmbed()
                .setAuthor(`Poll ended`)
                .setDescription(`${question[0].toUpperCase() + question.slice(1)}\n\n**Total Poll**\n👍: ${thumbsUp}\n👎: ${thumbsDown}`)
                .setColor("RANDOM")
                .setFooter(`This poll has ended.`)
            await msg.edit(em)
                
        }, ms(args[1]));
    }
}