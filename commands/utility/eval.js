const owners = ["470825695237636107"]
const { VultrexHaste } = require('vultrex.haste')
const { inspect } = require("util")
const { stripIndents } = require('common-tags')
var haste = new VultrexHaste({ url: "https://hasteb.in" });

module.exports ={
    name: "eval",
    aliases: ['testjscode', 'code', 'evall', 'eeval', 'ev'],
    description: "evaluate code from javascript!",
    usage: "[p]eval <code>",
    run: async(bot, message,args) => {
        if(!owners.includes(message.author.id)) return message.channel.send(`For security reasons. Only the bot owner can use this command`);
        
        if(owners.includes(message.author.id)){
        if(!args[0]) return message.channel.send(`Please provide JavaScript code to evaluate.\n\nUsage: **${bot.prefix}eval <code>**`)

        try {
            const start = process.hrtime();
            let output = eval(args.join(" "));
            const difference = process.hrtime(start);
            if (typeof output !== "string") output = inspect(output, { depth: 2 });

            return message.channel.send(stripIndents`
             
            
               \`\`\`js
            /*Executed in ${difference[0] > 0 ? `${difference[0]}s ` : ""}${difference[1] / 1e6}ms*/
        
              ${output.length > 1950 ? await haste.post(output) : output}
               \`\`\`
            `)
        } catch(err) {
            return message.channel.send(stripIndents`
            Error:
            \`${err.message}\`
            `)

        }
        }
    }
}
