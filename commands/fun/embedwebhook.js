const {MessageEmbed} = require('discord.js')


module.exports = {
    name: 'embedwebhook',
    description: 'Send an embed webhook to the channel',
    usage: 'embedwebhook <message>',
    run: async(bot, message, args)=>{
       
           const webhooks = await message.channel.fetchWebhooks()
           
           var webhook = webhooks.first();
           if(!webhook) return message.channel.send(`There isn\'t a webhook created in this channel!`)
            var embed = new MessageEmbed()
                .setDescription(args.join(" "))
                .setColor("RANDOM")
           await webhook.send({
               username: message.author.username,
               avatarURL: message.author.displayAvatarURL({format: "png", dynamic: true}),
               embeds: [embed]
           })
    message.delete()


}
}