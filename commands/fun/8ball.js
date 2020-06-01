
const {MessageEmbed} = require('discord.js')
module.exports={
    name: "8ball",
    description: "y do u care for 8ball?",
    category: "fun",
    run: async(bot,message,args)=>{
        let question = message.content.slice(bot.prefix.length+6)
        if(!question)return message.channel.send(`You did not specify your question!`)
        else{
            let responses=[
                "Yes",
                "No",
                "Definetly",
                "Absolutely",
                "Not in a million years",
                "no u",
                "a boom de la caca :laugh:",
                "ok buddy sureeee",
                "ur high rn ofc not",
                "yessir or madam reeee",
                "hate to break it to u kid but...yeah",
                "hate to break it to you kid but....no",
                "why tf r u asking a bot to do that. Frikin dumb kid stupid annoying dog son of a person mother trucking kid reee",
                "i dont think u should tho",
                "ofc not dumb person :sweaty:",
                "lmao thats a joke right? right?.....",
                "bruh im insane jarvis insane..... and i say yes",
                "yes or no ur choice im too tired for this bull"
            ]
            let response = responses[Math.floor(Math.random()*(responses.length)-1)]
            
            message.channel.send(response)
        }
    }
}

