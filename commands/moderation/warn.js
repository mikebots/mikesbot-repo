const db = require("quick.db");
const {
    MessageEmbed,
    Util
} = require("discord.js");

module.exports = {
    name: "warn",
    description: "Warn a member",
    usage: "[p]warn <Mention, ID, Tag> <reason>",
    category: "moderation",
    aliases: ['w', 'war'],
    run: async(bot, message, args)=>{
        if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("You need the kick members permission in order to warn someone");
        const member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag == args[0]);
        if(typeof member == "undefined") {
            message.channel.send(`Looks like that member isn't in the server!`);
            return;
        }
        if(member) {
            let reason = args.slice(1).join(" ");

            if(!args[1]) reason = "No Reason Specified";
            var totsInf = db.get(`totalInf_${message.guild.id}`) || 0;
            var Case = 1 + totsInf;
            db.add(`totalInf_${message.guild.id}`, 1);

            db.set(`cases_${message.guild.id}_#${Case}`,{
                moderator: message.author,
                reason: reason,
                date: Date.now(),
                user: member.user,
         
                case: Case,
                action: "Warn",
                avatarURL: member.user.displayAvatarURL()
              });
            message.channel.send(`Case #${Case} **${member.user.tag}** was warned.`);
            member.user.send(`Case #${Case} you were warned. ${reason}`).catch(err=> console.log(err));
        }
    }
}