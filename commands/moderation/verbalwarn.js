const db = require("quick.db");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "verbalwarn",
    description: "Give a member a warn for the first time!",
    usage: "[p]verbalwarn <member> <reason>",
    category: "moderation",
    aliases: ['verbwarn'],
    run: async(bot, message, args) =>{
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`You need the manage server permission in order to execute this command!`);

        if(!args[0])return message.channel.send(`Please specify a member!`) 
        if(!args[1]) reason = "No reason specified";

        var member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();

        var totalWarnsInMember = db.get(`warns_${message.guild.id}_${member.user.id}`) || 0;
        if(totalWarnsInMember <=0){
            message.channel.send(`Verbally warned ${member.user.tag} this is their first warning.`)
            db.add(`warns_${message.guild.id}_${member.user.id}`, 1)
            return;
        } else{
            message.channel.send(`${member.user.tag} was already verbally warned. Now warning ${member.user.tag}`)
        db.add(`warns_${message.guild.id}_${member.user.id}`, 1)
        return;
        }
    
    }
}

