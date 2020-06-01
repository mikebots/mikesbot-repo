const {MessageEmbed} = require('discord.js')

module.exports = async(bot, guild, user)=>{
    const channel = guild.channels.cache.find(c => c.name === "logs")
     
    var embed = new MessageEmbed()
   
    const webhooks = await channel.fetchWebhooks();
    if(!channel || webhooks===null) return;
    const webhook = webhooks.first()
    

    embed.setTitle(`${user.tag} was banned`)
    embed.setDescription(`${user.tag} was banned from ${guild.name}`)
    embed.setFooter(`User ID: ${user.id}`)

    embed.setTimestamp()
    embed.setColor("RANDOM")
    embed.setThumbnail(user.displayAvatarURL())

    await webhook.send({
        username: `${bot.user.username}-logging`,
        avatarURL: bot.user.displayAvatarURL(),
        embeds: [embed]
    })

}