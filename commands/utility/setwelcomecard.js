const db = require("quick.db");
module.exports = {
    name: "setwelcomecard",
    description: "Set the welcome card of your server",
    usage: "[p]setwelcomecard <true/false> <background url PNG ONLY PLEASE>",
    category: "configuration",
    aliases: ['welcomecard'],
    run: async(bot, message, args)=>{
        if(!args[0]) return message.channel.send(`Please specify wether to turn on or off the welcome card option`)
        if(args[0].toLowerCase()==="off"||args[0].toLowerCase()==="false") {
            db.set(`welcomecardon_${message.guild.id}`, false)
            db.set(`welcomecard_${message.guild.id}`, null)
            return message.channel.send(`Succesfully turned off the welcoming card.`)
        }
        if(!args[1]) return message.channel.send(`Please specify a background url in png`)
        
        if(args[0].toLowerCase()==="on"||args[0].toLowerCase()==="true"){
            db.set(`welcomecardon_${message.guild.id}`, true)
            db.set(`welcomecard_${message.guild.id}`, args.slice(1).join(" "))
            return message.channel.send(`Succesfully tuned on the welcoming card.`)
        }
    }
}