var {MessageEmbed} = require("discord.js")
var db = require("quick.db")
const {formatDate} = require("../../functions.js")
module.exports = {
    name: "viewcase",
    aliases: ['case', 'reviewcase'],
    description: "View a case.",
    usage: "[p]viewcase #<case number>",
    category: "moderation",
    run: async(bot, message, args)=>{
        if(!args[0]){
            message.channel.send("Please provide a case number")
            return;
        } else if(args[0]){
            try{
        var Case = db.get(`cases_${message.guild.id}_${args[0]}`)
        if(!Case&&Case==null) {
            message.channel.send(`Invalid Case number. Try again.`).then((msg)=>{ msg.delete({ timeout: 15000})})
            return;
        }   
          const embed = new MessageEmbed()
                .setTitle(`Case ${Case.Case}`)
                .setColor("RANDOM")
                .addField(`Case Info`, `Case: ${Case.case}\nModerator: ${Case.moderator.tag}\nReason: ${Case.reason}\nUser: ${Case.user.tag}(${Case.user.id}\nPunishment: ${Case.action}`)
                .setTimestamp(Case.date)
                .setThumbnail(Case.avatarURL)
                .setFooter(`This happened at`)


            message.channel.send(embed)
    }catch(Err){
                console.log(Err)
            }
        }
    }

}