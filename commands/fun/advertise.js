const {MessageEmbed} = require("discord.js") //677340869233344514 < channel id
module.exports={
    name: "ad",
    category: "fun",
    aliases: ['advertise', 'advertisement'],
    description: "Use this command to advertise your medias!",
    usage: "ad <advertisement> <link>",
    timeout: 2.16e+7,
    run: async(bot,message,args)=>{
        let Str = args.join(" ")
        if(!args[0])return message.channel.send("You didn't specify your advertisement!")
        var m = await bot.channels.cache.get("698696966695157893").send(new MessageEmbed().setThumbnail(message.author.displayAvatarURL()).setTitle(`New advertisement by ${message.author.tag}`).setFooter("Advertisement Bot Made by Mike H.").setTimestamp().setDescription(Str).addField(`Author`, `${message.author.username}`).setColor("RANDOM"))
   
        await message.channel.send({embed:{
            description: `Your advertisement has been posted!\n[View](https://discord.com/channels/${bot.channels.cache.get("698696966695157893").guild.id}/698696966695157893/${m.id})`,
            color: "RANDOM"
        }})
         }
}




























