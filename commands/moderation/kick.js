const {MessageEmbed} = require('discord.js')
var db = require(`quick.db`)
const {formatDate} = require("../../functions.js")
module.exports={
    name: "kick",
    aliases: ['k', 'kic'],
    description: "Kick a mentioned user or their id",
    category: "moderation",
    usage: `kick <User ID> (reason)`,
    run: async(bot,message,args)=>{
      if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send(`You need the kick members permission in order to execute this command.`)
      if(!message.guild.me.permissions.has("KICK_MEMBERS")) return message.channel.send("I need the kick members permission in order to execute this command!")
      
       if(!args[0])return message.channel.send(`Invalid Command Usage: Try\n[p]kick <User ID, mention> (reason)`) 
       let User = message.mentions.members.filter(m => m.user.id !== bot.user.id).first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(u => u.user.tag === args[0])

      

       
       if(!User)return message.channel.send("Error while trying to find the user/user id. Please try again.")
       let Reason = args.slice(1).join(" ") 
       if(!args[1]) Reason = "No reason specified";
       if(User.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`This user has a higher/equal to role than you I cannot kick them!`)
      if(!User.kickable)return message.channel.send("Error while trying to kick the user. Check to see if it's a valid user id, if the user is in the guild, or if the user has a higher role.")
       
      var totsInf = db.get(`totalInf_${message.guild.id}`) || 0;
      var Case = 1 + totsInf;
      db.add(`totalInf_${message.guild.id}`, 1)
      
      User.send(`Case \`${Case}\` , you were kicked in ${message.guild.name}(${message.guild.id})`).catch(err=>console.log(err));
        db.set(`action_${message.guild.id}_#${Case}`, "Ban")
        db.set(`cases_${message.guild.id}_#${Case}`,{
          moderator: message.author,
          reason: Reason,
          date: Date.now(),
          user: User.user,
   
          case: Case,
          action: "Kick",
          avatarURL: User.user.displayAvatarURL()
        })
       
       User.kick(`Case #${Case}`)
       message.channel.send(`Case \`${Case}\` ${User.user.tag} was kicked.`)
       
       
       //You can customize this as much as you'd like
}}
