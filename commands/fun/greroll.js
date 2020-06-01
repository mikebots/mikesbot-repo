var ms = require("ms")
var {discord, MessageEmbed} = require("discord.js")
var db = require("quick.db")
module.exports = {
    name: "greroll",
    description: "Reroll a giveaway!",
    category: "fun",
    aliases: ['reroll'],
    usage: "[p]greroll <Message ID>",
    run: async(bot, message, args)=>{
        if(!args[0]) return message.channel.send(`Please specify  a message id.`)
        var giveRole = message.guild.roles.cache.find(r => r.name === "Giveaways") || message.guild.roles.highest;
        
        if(!message.member.permissions.has("MANAGE_GUILD")&&!message.member.roles.cache.has(giveRole.id)) return message.channel.send(`You must be able to manage the guild or have a role called Giveaways in order to reroll a giveaway!.`)
        var bed = await message.channel.messages.fetch(args[0])

        if(bed.reactions.cache.get("🎉").users.cache.filter(u=>!u.bot).size == 0){
            message.channel.send(`There isn\'t a giveaway or reactions in that message.`)
            return;
        }
        if(bed){
            try{
                var winner = bed.reactions.cache.get("🎉").users.cache.filter(u => !u.bot).random();
               
                if(winner) { return message.channel.send(`The new winner is ${winner}!`); }
                
                
                
            } catch(err){
                console.log(err)
            }
        } else if(!bed){
            message.channel.send("No message found with that id in this channel.")
        }
    }
    
    
}