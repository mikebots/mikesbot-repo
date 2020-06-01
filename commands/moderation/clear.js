const Discord = require('discord.js');

module.exports={
    name: 'clear',
    category: 'moderation',
    aliases: ['c', 'purge'],
    description: "Bulk delete messages in a channel with this command!",
    usage: "[p]clear <count>",
    run: async(bot,message, args)=>{
    
    
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply('Looks like you can\'t use this command! You need to have the `Manage Messages` permission ticked on your role!');
    if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`I need the manage messages permission in order to bulk delete messages.`)
    if(!args[0]) return message.channel.send(`I need a number to bulk delete!`)
    let count = parseInt(args[0])
    if(isNaN(count)) return message.channel.send(`Looks like that isn\'t a number!`)
    if(count > 100) return message.channel.send(`The number cannot be higher than 100`)
    if(count <= 0) return message.channel.send(`The number must be higher than 0.`)
    await message.channel.bulkDelete(count, false)
        .then(async(deleted)=>{
            await message.channel.send(`Succesfully cleared **${deleted.size}/${args[0]}** messages`)
        })
        .catch(err=>console.log(err))

}}