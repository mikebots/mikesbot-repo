const owners = "470825695237636107"
const { VultrexHaste } = require('vultrex.haste')
const { inspect } = require("util")
const { stripIndents } = require('common-tags')
var haste = new VultrexHaste({ url: "https://hasteb.in" });

module.exports ={
    name: "haste",
    aliases: ['hastebin'],
    description: "Post code/messages into a hastebin!",
    category: "fun",

    usage: "[p]haste <message>",
    run: async(bot, message,args) => {
       
        if(!args[0]) return message.channel.send(`Please provide text to hastebin!`)

        try {
            const start = process.hrtime();
            let output = args.join(" ");
            const difference = process.hrtime(start);
            if(output.length < 20) return message.channel.send(`Your message must be more than 20 characters!`)

            return message.channel.send(stripIndents`
              

         
               ${output.length > 20 ? await haste.post(output) : output}
    
            `)
        } catch(err) {
            return message.channel.send(stripIndents`
            Error:
            \`${err}\`
            `)

        }
        
    }
}
