module.exports = {
    name: "webhook",
    description: "Send a webhhook message to a channel",
    run: async(bot, message, args)=>{
        
        const webhooks = await message.channel.fetchWebhooks()
      
        var webhook = webhooks.first();
       
        webhook.send(`${args.join(" ")}`, {
            username: `${message.author.username}`,
            avatarURL: `${message.author.displayAvatarURL({ dynamic: true, format: "png"})}`,
            
        }).then(()=>{
            message.delete()
        })
    }
}