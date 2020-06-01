const {MessageEmbed} = require('discord.js')
const api = require("imageapi.js")
module.exports={
    name: "meme",
    description: "Get a meme from a reddit",
    category: "fun",
    usage: "[p]meme",
    aliases: ['memes'],
    run: async(bot,message,args)=>{
    
        let subreddits = [
            "comedyheaven",
            "dank",
            "meme",
            "memes"
          
            
        ]
        let subreddit = subreddits[Math.floor(Math.random()*(subreddits.length))]
        let img = await api(subreddit)
        const Embed = new MessageEmbed()
        .setTitle(`Enjoy this meme from r/${subreddit}`)
        .setURL(`https://reddit.com/r/${subreddit}`)
        .setColor('RANDOM')
        .setImage(img)
        message.channel.send(Embed)
    }
}