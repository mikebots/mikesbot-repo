const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "avatar",
    description: "Get a users or your avatar!",
    usage: "avatar | avatar <Mention | ID> | avatar [nickname/tag]",
    aliases: ['avt'],
    category: "fun",
    run: async(bot, message, args) =>{
       const User = message.guild.members.cache.find(m=>m.displayName==args.join(" ")) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m=>m.user.tag==args.join(" ")) || message.mentions.members.first() || message.member;

        var embed = new MessageEmbed()
        embed.setTitle(`Avatar for ${User.user.tag}`)
        embed.setDescription(`[png](${User.user.displayAvatarURL({format: "png"})}) | [webp](${User.user.displayAvatarURL({format: "webp"})}) | [gif](${User.user.displayAvatarURL({dynamic: true})}) | [jpg](${User.user.displayAvatarURL({format: "jpg"})})`)
        embed.setURL(User.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048}))
        embed.setColor("RANDOM")
        embed.setImage(User.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048}))
       
        message.channel.send(embed)
    }
}