const {MessageEmbed} = require("discord.js")
const db = require("quick.db")
module.exports = {
    name: "new",
    aliases: ['new-ticket'],
    description: "Creates a ticket",
    usage: "[p]new <Topic>",
    category: "utility",
    run: async(bot, message, args)=>{
        let topic = args.join(" ")
        if(!args[0]) topic = "No topic specified"
        let ticketcategory = db.get(`ticketcategory_${message.guild.id}`) || message.guild.channels.cache.find(c => c.type === "category" && c.name === "tickets")
        if(ticketcategory===null||!ticketcategory) {
            message.guild.channels.create(`tickets`, {
                type: "category"
            }).then((c)=>{
                ticketcategory = c.id
            })
        }
        const ticketcheck = db.get(`ticketcheck_${message.guild.id}`)
        //if(!ticketcheck||ticketcheck===null||ticketcheck===false) return message.channel.send(`This server hasn't setup tickets yet!`)
        let ticketrole = db.get(`ticketrole_${message.guild.id}`)
        if(!ticketrole || ticketrole===null) ticketrole = message.guild.roles.highest
        const user = message.author;
        const name = "ticket-" + user.username;
        if(message.guild.channels.cache.find(c => c.name == name)){
            return message.channel.send(`You already have a ticket opened!`)
        }else{
            message.guild.channels.create(name).then((chan)=>{
                chan.updateOverwrite(message.guild.id, {
                    VIEW_CHANNEL: false
                })
                chan.setParent(ticketcategory)
                chan.updateOverwrite(user.id,{
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true
                })
                chan.updateOverwrite(ticketrole,{
                    VIEW_CHANNELS: true,
                    SEND_MESSAGES: true
                })
                 message.channel.send(`Ticket Created. Checkout <#${chan.id}>`)
                 message.delete()
                const embed = new MessageEmbed()
                    .setTitle(name)
                    .setColor("BLACK")
                    .setDescription(topic)
                    .setFooter(`Ticket System v1.0.3 | Made by Mike H.`)
                    .setTimestamp()
                    .setThumbnail(user.displayAvatarURL())
               chan.send(`@everyone, ${name}`, embed).then((m)=>{
                    m.pin()

                  
                })

            })

        }
    }
}