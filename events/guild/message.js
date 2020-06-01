require('dotenv').config();
const Timeout = new Set();
var {MessageEmbed} = require("discord.js")
const prefix = process.env.PREFIX
const ms = require("ms")
const db = require('quick.db')

module.exports=async(bot,message)=>{
        if(message.author.bot) return;
        if(!message.guild) return;
        var prefix = db.get(`prefix_${message.guild.id}`)
        if(!prefix&&prefix==null){
                prefix = process.env.PREFIX
        }
        if(message.content.startsWith(`<@${bot.user.id}>`)) prefix = `<@${bot.user.id}>`;
       // if(message.content.startsWith(`<@!${bot.user.id}>`)) prefix = `<@!${bot.user.id}>`;
       // if(message.content.startsWith(`<@${bot.user.id}> `)) prefix = `<@${bot.user.id}> `;
       
        bot.prefix = prefix;
       
        if(!message.content.toLowerCase().startsWith(prefix)) return;
        
        if(!message.member) message.member = await message.guild.fetchMember(message);
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase()
        if(cmd.length == 0 ) return;
        var command = bot.commands.get(cmd)
        if(!command) command = bot.commands.get(bot.aliases.get(cmd));
        
        
        if(command){
            let check = db.get(`enabled_${message.guild.id}_${command.name}`)
            var checkEmbed = new MessageEmbed()
            checkEmbed.setTitle(`${command.name[0].toUpperCase() + command.name.slice(1)} has been disabled`)
            checkEmbed.setColor("RED");
            checkEmbed.setDescription(`${command.name[0].toUpperCase() + command.name.slice(1)} has been disabled on this server. Tell a server admin to re enable it.`)
            checkEmbed.setTimestamp()
            if(check==false) return message.channel.send(checkEmbed)
          
                
               
           else{
        
            

            if(command.timeout){
                if(Timeout.has(`${message.author.id}${command.name}`)){
                        var embed = new MessageEmbed()
                        embed.setTitle(`${command.name[0].toUpperCase() + command.name.slice(1)} is under cooldown!`)
                        embed.setColor("RED")
                        embed.setDescription(`You can only use this command every **${ms(command.timeout)}**`)
                    return message.channel.send(embed)
                } else {
                    Timeout.add(`${message.author.id}${command.name}`)
                    setTimeout(()=>{
                        Timeout.delete(`${message.author.id}${command.name}`)
                    }, command.timeout)
                }
            
        
    }
            command.run(bot, message,args)
            }
        }  
        
        

    
}