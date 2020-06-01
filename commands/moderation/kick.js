const {MessageEmbed} = require('discord.js')

const db = require("quick.db")
module.exports={
    name: "kick",
    description: "Kick a mentioned user or their id",
    category: "moderation",
    aliases: ['k', 'kic'],
    usage: "[p]kick <User ID, Tag, Mention> (reason)",
    aliases: ['k'],
    run: async(bot,message,args)=>{
        if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send(`\`Error 401(Unauthorized)\` Looks like you need the kick members permission.`)
       if(!args[0])return message.channel.send(`\`Error 400(Bad Request Error)\`Invalid Command Usage: Try\n \`\`${bot.prefix}kick <User ID> (reason)\n\`\`" `) 
       let User = message.mentions.members.filter(m=>m.user.id !== bot.user.id).first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(u => u.tag === args[0])
       if(typeof User == "undefined")return message.channel.send("`Error 404(Not Found)` Error while trying to find the user/user id. Please try again.")
       let Reason =  args.slice(1).join(" ")
       if(!args[1]) Reason = "No reason specified";
       if(User.user.id == message.member.id){
           message.channel.send(`\`Error 401(Unauthorized)\` You are unable to do that`)
           return;
       }
       if(User.roles.highest.position > message.member.roles.highest.position&& message.member.id !== message.guild.ownerID){
           message.channel.send(`This user has a higher role than you I cannot kick them.`)
           return;
       }
       if(!User.kickable){
           message.channel.send(`\`Error 403(Forbidden)\` I am unable to kick this member.`)
           return;
       }
       try{
        var adder = 1
        var totsInf = db.get(`totalInf_${message.guild.id}`) || 0;
        var Case = 1 + totsInf;
        db.add(`totalInf_${message.guild.id}`, 1)
        let guildBans = new Object()
        guildBans[Case] = [];
        guildBans["type"] = [];
        guildBans[`${Case}-User`] = [];
        guildBans[`${Case}-Date`] = []; //"[some text here](url)"
        guildBans["type"].push(`Punishment: Kick`)
        guildBans[`${Case}-User`].push(`${User.user.id}(${User.toString()})\n${User.user.tag}`)
        
        guildBans[Case].push(`**Action:** Kick\n**Reason: ${Reason}**\n`)
        guildBans[Case].push(`**Moderator:** ${message.member.id}(${message.member.toString()})\n${message.author.tag}\n`)
       
        guildBans[`${Case}-Date`].push(`${Date.now()}`)
        db.set(`action_${message.guild.id}_#${Case}`, "Kick")
        db.set(`cases_${message.guild.id}_#${Case}`, guildBans[Case])
        db.set(`avt_${message.guild.id}_#${Case}`, User.user.displayAvatarURL())
        db.set(`casedate_${message.guild.id}_#${Case}`, Date.now())
        db.set(`caseuser_${message.guild.id}_#${Case}`, guildBans[`${Case}-User`])
        User.send(`Case \`#${Case}\` you were kicked, ${Reason}`)
       User.kick(`Case #${Case}`)
       message.channel.send(`Case \`#${Case}\` ${User.user.tag} was kicked.`)
        

       }catch(err){
           console.log(err)
           message.channel.send(`Oops seems like an error has occured. \`${err}\``)
       }

    }
}
