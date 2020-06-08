const lockedChannels = new Map();
const Discord = require("discord.js")
module.exports = {
    name: "lockdown",
    usage: "[p]lockdown <true/false> | [p]lockdown <role ID/Mention> <true/false> | [p]lockdown <User ID/Mention> <true/false>",
    description: "Lockdown your server to prevent raids!",
    category: "moderation",
    aliases: ['lock', 'server-lockdown'],
    timeout: 600000,
    run: async(bot, message, args)=>{
        if(!message.member.permissions.has(["MANAGE_CHANNELS", "MANAGE_ROLES", "MANAGE_GUILD"])) return message.channel.send(`You need the manage channels,roles and server permission in order to use this command.`)
         if(!message.guild.me.permissions.has(["MANAGE_CHANNELS", "MANAGE_ROLES", "MANAGE_GUILD"])) return message.channel.send(`I need the manage channels,roles and server permission in order to use this command.`)

        if(!args[0]) return message.channel.send(`Please specify an option: **true** or **false**, or a role and option: **role id/name** **True** or **false**.`);

        if(!args[1]){
            try{
                const channels = message.guild.channels.cache.filter(c => c.type === "text"&&c.permissionsFor(message.guild.id).has("SEND_MESSAGES"))
                if(args[0].toLowerCase()==="true"){
                    channels.forEach(async(channel)=>{
                    
                    
                    if(!channel.permissionsFor(message.guild.me.user.id).has("MANAGE_CHANNEL")) return;
                    await channel.updateOverwrite(message.guild.roles.everyone, {
                        SEND_MESSAGES: false
                    })
                    await channel.setName(`${channel.name}-locked`)
                    lockedChannels.set(channel.id, message.guild.id)
                })
                await message.channel.send(`This server is now on lockdown.`)
                } else if(args[0].toLowerCase()==="false"){
                    const chan = message.guild.channels.cache.filter(c => c.type === "text"&&lockedChannels.has(c.id))
                    chan.forEach(async(channel)=>{
                        if(!channel.permissionsFor(message.guild.me.user.id).has("MANAGE_CHANNEL")) return;

                        else {
                            await channel.updateOverwrite(message.guild.roles.everyone, {
                                SEND_MESSAGES: true
                            })
                            var cName = channel.name;
                            if(cName.includes("-locked"))
                            cName = cName.replace("-locked", " ")
                            await channel.setName(`${cName}`)
                        }
                        lockedChannels.delete(channel.id)
                    })
                    
                    await message.channel.send(`This server has now been removed from lockdown.`)
                }
                
            }catch(err){
                console.log(err)
                message.channel.send(`An error has occured. This command has now been canceled.`)
            }
        }
        else if(args[0]&&message.guild.roles.cache.has(args[0])){
            const role = message.guild.roles.cache.get(args[0])
            const channels = message.guild.channels.cache.filter(c => c.type === "text" && c.permissionsFor(role.id).has("SEND_MESSAGES"))

            try{
                if(args[1].toLowerCase()==="true"){
                    channels.forEach(async(channel)=>{
                    
                    
                    if(!channel.permissionsFor(message.guild.me.user.id).has("MANAGE_CHANNEL")) return;
                    await channel.updateOverwrite(role, {
                        SEND_MESSAGES: false
                    })
                    await channel.setName(`${channel.name}-locked`)
                    lockedChannels.set(channel.id, message.guild.id)
                })
                await message.channel.send(`This server is now on lockdown.`)
                } else if(args[1].toLowerCase()==="false"){
                    const chan = message.guild.channels.cache.filter(c => c.type === "text"&&lockedChannel.has(c.id))
                    chan.forEach(async(channel)=>{
                        if(!channel.permissionsFor(message.guild.me.user.id).has("MANAGE_CHANNEL")) return;

                        else {
                            await channel.updateOverwrite(role, {
                                SEND_MESSAGES: true
                            })
                            var cName = channel.name;
                            if(cName.includes("-locked"))
                            cName = cName.replace("-locked", " ")
                            await channel.setName(`${cName}`)
                        }
                        lockedChannels.delete(channel.id)
                    })
                    
                    await message.channel.send(`This server has now been removed from lockdown.`)
                }
            }catch(err){
                console.log(err)
            }
        } else if(args[0]&&message.mentions.roles.size == 1){
            const role = message.mentions.roles.first()
            const channels = message.guild.channels.cache.filter(c => c.type === "text" && c.permissionsFor(role.id).has("SEND_MESSAGES"))

            try{
                if(args[1].toLowerCase()==="true"){
                    channels.forEach(async(channel)=>{
                    
                    
                    if(!channel.permissionsFor(message.guild.me.user.id).has("MANAGE_CHANNEL")) return;
                    await channel.updateOverwrite(role, {
                        SEND_MESSAGES: false
                    })
                    await channel.setName(`${channel.name}-locked`)
                    lockedChannels.set(channel.id, message.guild.id)
                })
                await message.channel.send(`This server is now on lockdown.`)
                } else if(args[1].toLowerCase()==="false"){
                    const chan = message.guild.channels.cache.filter(c => c.type === "text"&&lockedChannels.has(c.id))
                    chan.forEach(async(channel)=>{
                        if(!channel.permissionsFor(message.guild.me.user.id).has("MANAGE_CHANNEL")) return;

                        else {
                            await channel.updateOverwrite(role, {
                                SEND_MESSAGES: true
                            })
                            var cName = channel.name;
                            if(cName.includes("-locked"))
                            cName = cName.replace("-locked", " ")
                            await channel.setName(`${cName}`)
                        }
                        lockedChannels.delete(channel.id)
                    })
                    
                    await message.channel.send(`This server has now been removed from lockdown.`)
                }
            }catch(err){
                console.log(err)
            }
        } else if(args[0]&&message.guild.members.cache.has(args[0])){
            const role = message.guild.members.cache.get(args[0])
            const channels = message.guild.channels.cache.filter(c => c.type === "text" && c.permissionsFor(role.id).has("SEND_MESSAGES"))

            try{
                if(args[1].toLowerCase()==="true"){
                    channels.forEach(async(channel)=>{
                    
                    
                    if(!channel.permissionsFor(message.guild.me.user.id).has("MANAGE_CHANNEL")) return;
                    await channel.updateOverwrite(role, {
                        SEND_MESSAGES: false
                    })
                    await channel.setName(`${channel.name}-locked`)
                    lockedChannels.set(channel.id, message.guild.id)
                })
                await message.channel.send(`This server is now on lockdown.`)
                } else if(args[1].toLowerCase()==="false"){
                    const chan = message.guild.channels.cache.filter(c => c.type === "text"&&lockedChannels.has(c.id))
                    chan.forEach(async(channel)=>{
                        if(!channel.permissionsFor(message.guild.me.user.id).has("MANAGE_CHANNEL")) return;

                        else {
                            await channel.updateOverwrite(role, {
                                SEND_MESSAGES: true
                            })
                            var cName = channel.name;
                            if(cName.includes("-locked"))
                            cName = cName.replace("-locked", " ")
                            await channel.setName(`${cName}`)
                        }
                        lockedChannels.delete(channel.id)
                    })
                    
                    await message.channel.send(`This server has now been removed from lockdown.`)
                }
            }catch(err){
                console.log(err)
            }
        } else if(args[0]&&message.mentions.members.size == 1){
            const role = message.mentions.members.first();
            const channels = message.guild.channels.cache.filter(c => c.type === "text" && c.permissionsFor(role.id).has("SEND_MESSAGES"))

            try{
                if(args[1].toLowerCase()==="true"){
                    channels.forEach(async(channel)=>{
                    
                    
                    if(!channel.permissionsFor(message.guild.me.user.id).has("MANAGE_CHANNEL")) return;
                    await channel.updateOverwrite(role, {
                        SEND_MESSAGES: false
                    })
                    await channel.setName(`${channel.name}-locked`)
                    lockedChannels.set(channel.id, message.guild.id)
                })
                await message.channel.send(`This server is now on lockdown.`)
                } else if(args[1].toLowerCase()==="false"){
                    const chan = message.guild.channels.cache.filter(c => c.type == "text"&&lockedChannels.has(c.id))
                     chan.forEach(async(channel)=>{
                        if(!channel.permissionsFor(message.guild.me.user.id).has("MANAGE_CHANNEL")) return;

                        else {
                            await channel.updateOverwrite(role, {
                                SEND_MESSAGES: true
                            })
                            var cName = channel.name;
                            if(cName.includes("-locked"))
                            cName = cName.replace("-locked", " ")
                            await channel.setName(`${cName}`)
                        }
                        lockedChannels.delete(channel.id)
                    })
                    
                    await message.channel.send(`This server has now been removed from lockdown.`)
                }
            }catch(err){
                console.log(err)
            }
        }
    }
}
