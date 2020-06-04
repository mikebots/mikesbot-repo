const db = require('quick.db') //Fetching the quick.db module
const {MessageEmbed, discord} = require('discord.js')//Fetching the MessageEmbed constructor and discord library

module.exports = {//Command Configuration
    name: "suggest",//Command name
    description: "Suggest your opinion and get it voted on!",//The command description for the help command
    aliases: ['s'],//The command alias EX: People could use <p>s <suggestion> instead of <p>suggest <suggestion>
    usage: "[p]suggest <Suggestion>", //Command usage for the help command
    category: "fun",//Command category for the help command
    run: async(bot, message, args)=>{//Running the command(Writing our code so it could import it)
        var channel = message.guild.channels.cache.get(db.fetch(`suggestchan_${message.guild.id}`))//Gets the channel
        if(channel==null){
            return message.channel.send(`There isn\'t a suggestion channel setup! Set one up by using the ${db.get(`prefix_${message.guild.id}`)}setsuggestions <mentioned channel,id> command!`)
        }
        const webhooks = await channel.fetchWebhooks()
        
        var webhook = webhooks.first();//Fetches the first webhook
         
        var embed = new MessageEmbed()
            
            .setDescription(args.join(" "))
            .setColor("YELLOW")
            .setFooter(`User ID: ${message.author.id} | Powered by Mike H.`)
            .setTimestamp()
        
        let m = await webhook.send({
            username: message.author.username,
            avatarURL: message.author.displayAvatarURL({dynamic: true}),
            embeds: [embed]
        })
        channel.messages.fetch(m.id).then(m=>{
        m.react("656968927192285195")
        m.react("717980176796876861")
        
        })
        message.channel.send(`Your suggestion is now being voted on at <#${channel.id}>.`)
        message.delete()
        
        .catch((err)=>{
            console.log(err)
        })


    }
}
