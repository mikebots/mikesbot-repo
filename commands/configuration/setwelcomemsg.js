var db = require("quick.db")
var {MessageEmbed} = require("discord.js");

module.exports = {
    name: "setwelcomemsg",
    aliases: ['welcomemsg', 'setwelcomemessage'],
    description: "Set the welcome message for your guild!\nVariables: member.tag(new members tag), guild.name(the name of the server the member joins, guild.id(the server's id), member.username(the new members username), member.mention(mention the new member).",

    category: "configuration",
    usage: "[p]setwelcomemsg <--embed/--text> <Message>",
    run: async(bot, message, args)=>{
        if(!args[0]){
            try{
                var isCheck = db.get(`welmesset_${message.guild.id}`)
                
                    message.channel.send(`Please specify whether to make the welcome message an embed or regular text.`)
                    return;
                
            }catch(err){
                console.log(err)
            }
            return;
        } 
        var isCheck = db.get(`welmesset_${message.guild.id}`)
        if(args[0].toLowerCase()=="--embed"){
            var welmess = args.slice(1).join(" ")
            if(!args[1]){
                message.channel.send("Welcome message set to default!")
                db.set(`defaultmsg_${message.guild.id}`, true)
                db.set(`embedmsg_${message.guild.id}`, true);
                return;
            }
            else if(args[1]&&welmess){
                try{
                   db.set(`welmesset_${message.guild.id}`, true)
                   db.set(`welmess_${message.guild.id}`, welmess)
                   db.set(`embedmsg_${message.guild.id}`, true)
                    db.set(`defaultmsg_${message.guild.id}`, false)
                    message.channel.send(`Succesfully set the welcome message!`)

                }catch(Err){
                    console.log(Err)
                }
            } 
        } else if(args[0].toLowerCase()=="--text"){
            var welmess = args.slice(1).join(" ")
            if(!args[1]){
                message.channel.send("Welcome message set to default!")
                db.set(`defaultmsg_${message.guild.id}`, true)
                db.set(`embedmsg_${message.guild.id}`, false);
                return;
            }
            else if(args[1]&&welmess){
                try{
                    db.set(`welmesset_${message.guild.id}`, true)
                    db.set(`welmess_${message.guild.id}`, welmess)
                    db.set(`defaultmsg_${message.guild.id}`, false)
                    db.set(`embedmsg_${message.guild.id}`, false)
                     message.channel.send(`Succesfully set the welcome message!`)
 
                 }catch(Err){
                     console.log(Err)
                 }
            }
        }
    }
}