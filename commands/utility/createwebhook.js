module.exports = {
    name: "create-webhook",
    aliases: ['createwebhook', 'cw', 'webhookcreate', 'webhook-create'],
    usage: "[p]create-webhook | [p]create-webhook <Channel Mention/ID>",
    description: "Create a webhook for a channel",
    category: "utility",
    run: async(bot,message,args)=>{
         if(!args[0]) {
            try{
                if(!message.channel.permissionsFor(message.member.id).has("MANAGE_CHANNEL")) return message.channel.send(`You do not have the manage channel permission for this channel.`)
                if(!message.channel.permissionsFor(message.guild.me.user.id).has("MANAGE_CHANNEL")) return message.channel.send(`I do not have the manage channel permission on <#${channel.id}>`)

                await message.channel.createWebhook(bot.user.username, {
                    avatar: bot.user.displayAvatarURL(),
                    reason: "Needed a webhook for this channel"
                }).then(()=>{
                    message.channel.send(`Succesfully created a webhook for this channel`)
                })
                    
            }catch(err){
                console.log(err)
                message.channel.send(`Ooops an error occured \`${err}\` `)
            }

        } else if(args[0]){

            try{
                var channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
                if(!channel.permissionsFor(message.member.id).has("MANAGE_CHANNEL")) return message.channel.send(`You do not have the manage channel permission on <#${channel.id}>`)
                if(!channel.permissionsFor(message.guild.me.user.id).has("MANAGE_CHANNEL")) return message.channel.send(`I do not have the manage channel permission on <#${channel.id}>`)

                  if(channel.type === "voice") return message.channel.send(`You cannot create a webhook for a voice channel!`)
                if(channel.type === "category") return message.channel.send(`You cannot create a webhook for a category please do individual channels.`)
                await channel.createWebhook(bot.user.username, {
                    avatar: bot.user.displayAvatarURL(),
                    reason: `${channel.name} needed a webhook`
                }).then(()=>{
                    message.channel.send(`Succesfully created a webhook for <#${channel.id}>`)
                })
            }catch(err){
                console.log(err.message)
                message.channel.send(`Oops an error occured. \`${err}\` `)
            }
        }
    }
}