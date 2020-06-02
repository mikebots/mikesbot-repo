/*const { MessageCollector } = require("discord.js")
const MessageModel = require('../../database/model/message')
let msgCollectorFilter = (newMsg, originalMsg) => newMsg.author.id === originalMsg.author.id;
 

const db = require('quick.db')
module.exports = {

    name: "addreaction",
    description: "Enables a message to have reaction roles.",
    aliases: ['crmsg', 'crm', 'cr', 'crr', 'create-reaction', 'create-reaction-role'],
    usage: "[p]addreaction <Message ID>",
    category: "reaction_roles",
    run: async(bot, message, args)=>{
            const prefix = db.get(`prefix_${message.guild.id}`) || process.env.PREFIX;
            if(args.length !== 1){
                let msg = await message.channel.send(`Too many arguments, provide 1 message id.`)
                msg.delete({ timeout: 5000}).catch(err => console.log(err))
            } else {
                try{
                let fetchedMessage = await message.channel.messages.fetch(args.join(" "))
                if(fetchedMessage){
                    await message.channel.send(`Please provide all of the emoji names with the role name\nUsage: **emoji name, role name/mention**\nType ${prefix}done once you\'re done.`)


                   
                    let collector = new MessageCollector(message.channel, msgCollectorFilter.bind(null, message));
                    let emojiRoleMappings = new Map()
                    collector.on('collect', msg =>{
                        if(msg.content.toLowerCase()===`${prefix}done`){
                            collector.stop("Done command was issued")
                            msg.channel.send(`Command finished.`)
                            .then(msg => msg.delete({ timeout: 7000}))
                            .catch(err => console.log(err))
                            return;
                        }
                        
                        let { cache } = bot.emojis;
                        let [ emojiName, roleName ] = msg.content.split(/,\s+/)
                        if(!emojiName && !roleName) return;
                        
                        let emoji = cache.find(emoji => emoji.name === emojiName) || cache.get(emojiName)
                        if(!emoji) {
                            msg.channel.send(`Emoji does not exist. Try again.`) 
                            .then(msg => msg.delete({ timeout: 5000}))
                            .catch(err => console.log(err))
                     
                            return;
                        }
                        let role = msg.guild.roles.cache.find(role => role.name === roleName) || msg.mentions.roles.first() || msg.guild.roles.cache.get(roleName)
                        if(!role) {
                            msg.channel.send(`Role does not exist. Try again.`)
                            .then(msg => msg.delete({ timeout: 5000}))
                            .catch(err => console.log(err))
                        
                            return;
                        }
                        if(!msg.member.permissions.has("MANAGE_ROLES")){
                            msg.channel.send(`You need to have the manage roles permission in order to execute this command.`)
                            .then(msg => msg.delete({ timeout: 6000}))
                             .catch(err => console.log(err))
                             return;
                         }
                        if(msg.member.roles.highest.position <= role.position){
                            msg.channel.send(`This role is higher or equal to than your role. I cannot add it as a reaction role`)
                            .then(meg => meg.delete({ timeout: 10000}))
                            .catch(err => console.log(err))
                            return;
                        }
                        if(msg.guild.me.roles.highest.position <= role.position){
                            msg.channel.send(`This role is higher or equal to than me. I cannot add it as a reaction role.`)
                            .then(msg => msg.delete({ timeout: 7000}))
                            .catch(err => console.log(err))
                            return;
                        }
                        fetchedMessage.react(emoji)
                            .then(emoji => console.log("Reacted!"))
                            .catch(err => console.log(err))
                            emojiRoleMappings.set(emoji.id, role.id)
                        
                     
                       
                     
                    });
                    collector.on('end', async(collected, reason)=>{
                        let findMsgDocument = await MessageModel.findOne({ messageId: fetchedMessage.id }).catch(err => console.log(err))
                        if(findMsgDocument){
                            console.log(`Message Exists....`)
                            message.channel.send(`There is already a reaction role setup with that message id.`)
                        }else {
                        let dbMsgModel = new MessageModel({
                            messageId: fetchedMessage.id,
                            emojiRoleMappings: emojiRoleMappings
                        });
                        dbMsgModel.save().then(m => console.log(m)).catch(err => console.log(err));
                    }

                    })
                    
                
                    
                   
                   
                }
                }catch(err){
                    console.log(err)
                    let msg = await message.channel.send(`Invalid Message ID, Message was not found.`)
                    msg.delete({ timeout: 3500})
                }
            }
         
    }
}*/
