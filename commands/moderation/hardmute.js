const ms = require('ms')
var {MessageEmbed, discord} = require('discord.js')
const db = require('quick.db')
module.exports = {
    name: "hardmute",
    description: "Hardmute (remove all of a users roles then add the muterole) a user!",
    usage: "[p]hardmute <User Mention | User ID> <Time(d,m,w,s)> <Reason>",
    aliases: ['m', 'mute', 'hm'],
    category: "moderation",
    run: async(bot, message, args)=>{
        if(!message.member.permissions.has("KICK_MEMBERS"))return message.channel.send(`You need the kick members permission in order to execute this command.`)
        if(!args[0]) return message.channel.send(`Please specify a user!`)
        if(!args[1]) return message.channel.send(`Please specify a time!`)
        var User = message.guild.members.cache.get(args[0]) || message.mentions.members.filter(m => m.user.id !== bot.user.id).first() || message.guild.members.cache.find(u => u.tag === `${args[0]}`)
       
        var time = args[1]
        var Reason = args.slice(2).join(" ")
       
        if(User.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`This user has a higher/equal to role than you!`)
         if(isNaN(args[1][0])) time = "1h";
         //if(!args[1].endsWith("d")&&!args[1].endsWith("w")&&!args[1],endsWith("s")&&!args[1].endsWith("m")&&!args[1].endsWith("h")) return message.channel.send(`That isn\'t a correct time! Try again using formats like "1d" or "3s" etc.`)
        if(!args[2]) Reason = "No reason specified";

        var muteRole = message.guild.roles.cache.find(r => r.name === "Muted") || db.get(`muterole_${message.guild.id}`) || null
        if(muteRole==null&&!muteRole){
            var ccount = message.guild.me.roles.highest.position - 1;
            var r = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: 'RED',
                    permissions: 0,
                    position: ccount
                }
            })
            muteRole = r;
            message.guild.channels.cache.forEach((c)=>{
                c.updateOverwrite(muteRole, {
                    SEND_MESSAGES: false
                })
            })
            
         
        
         
            
            User.roles.set([]).then(member =>{
                member.roles.add(muteRole)
                message.channel.send(`Succesfully hardmuted **${member.user.tag}** for ${args[1]}, ${Reason}`)
                setTimeout(()=>{
                    if(User.roles.cache.has(muteRole.id)){
                        User.roles.remove(muteRole)
                    User.send(`You were unmuted. Reason: Duration Expired`)
                    } else {
                        return;
                    }
            }, ms(time))
        })
        }
        else if(muteRole){
            User.roles.set([]).then(member =>{
                member.roles.add(muteRole)
                message.channel.send(`Succesfully hardmuted **${member.user.tag}**! | ${Reason}`)
                setTimeout(()=>{
                    if(User.roles.cache.has(muteRole.id)){
                        User.roles.remove(muteRole)
                    User.send(`You were unmuted. Reason: Duration Expired`)
                    } else {
                        return;
                    }
                }, ms(time))
            })
        }
       

    }
}