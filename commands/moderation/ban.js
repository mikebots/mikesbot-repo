const {MessageEmbed} = require('discord.js')
var db = require(`quick.db`)
const {formatDate} = require("../../functions.js")
module.exports={
    name: "ban",
    aliases: ['b'],
    description: "ban a mentioned user or their id",
    category: "moderation",
    usage: `ban <User ID> (reason)`,
    run: async(bot,message,args)=>{
      if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send(`You need the ban members permission in order to execute this command.`)
      if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send("I need the ban members permission in order to execute this command!")
      
       if(!args[0])return message.channel.send(`Invalid Command Usage: Try\n[p]ban <User ID, mention> (reason)`) 
       let User = message.mentions.members.filter(m => m.user.id !== bot.user.id).first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(u => u.tag === args[0])

      

       
       if(!User)return message.channel.send("Error while trying to find the user/user id. Please try again.")
       let Reason = args.slice(1).join(" ") 
       if(!args[1]) Reason = "No reason specified";
       if(User.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`This user has a higher/equal to role than you I cannot ban them!`)
      if(!User.bannable)return message.channel.send("Error while trying to ban the user. Check to see if it's a valid user id, if the user is in the guild, or if the user has a higher role.")
       
      var totsInf = db.get(`totalInf_${message.guild.id}`) || 0;
      var Case = 1 + totsInf;
      db.add(`totalInf_${message.guild.id}`, 1)
      
      User.send(`Case \`${Case}\` , you were banned in ${message.guild.name}(${message.guild.id})`)
        db.set(`action_${message.guild.id}_#${Case}`, "Ban")
        db.set(`cases_${message.guild.id}_#${Case}`,{
          moderator: message.author,
          reason: Reason,
          date: Date.now(),
          user: User.user,
   
          case: Case,
          action: "Ban",
          avatarURL: User.user.displayAvatarURL()
        })
       
       User.ban(`Case #${Case}`)
       message.channel.send(`Case \`${Case}\` ${User.user.tag} was banned.`)
       
       
       //You can customize this as much as you'd like
}}