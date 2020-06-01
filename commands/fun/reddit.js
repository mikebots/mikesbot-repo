const {MessageEmbed} = require('discord.js')
const api = require("imageapi.js")
module.exports={
    name: "reddit",
    usage: "[p]reddit <Subreddit>",
    aliases: ['r/', 'subreddit'],
    description: "Get a meme from a reddit",
    category: "fun",
    run: async(bot,message,args)=>{
        
        let Subreddit = args.join(" ")
        if(!args[0]) return message.channel.send("Subreddit is a required argument.")

        try{
            let img = await api(Subreddit)
            const Embed = new MessageEmbed()
                .setTitle(`A random image from r/${Subreddit}`)
                .setColor("RANDOM")
                .setURL(`https://reddit.com/r/${Subreddit}`)
                .setImage(img)
            message.channel.send("https://reddit.com/r/" + `${Subreddit}`, Embed)
            message.channel.send("`Image not appearing? Click the link!`")
        }catch(err){
            console.log(err)
            return message.channel.send(`Oops looks like an error occured! \`${err}\` `)
        }
    }
}
    