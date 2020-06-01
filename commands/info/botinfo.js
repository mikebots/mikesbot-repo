const {MessageEmbed} = require("discord.js")
module.exports = {
    name: "botinfo",
    aliases: ['clientinfo'],
    description: "Get the information on this bot!",
    usage: "[p]botinfo",
    category: "info",
    run: async(bot, message, args)=>{
        const b = await bot.fetchApplication()
        const botOwner = b.owner
        const guildsSize = bot.guilds.cache.size
        const usersCount = bot.users.cache.size
        const botCount = bot.users.cache.filter(b => b.bot).size
        const humans = bot.users.cache.filter(u => !u.bot).size

        const embed = new MessageEmbed()
            .setTitle(`${bot.user.tag}'s info`)
            .addField(`Owner`, `${botOwner.tag}\n${botOwner.id}`)
            .addField(`Total Guilds`, `${guildsSize}`)
            .addField(`Member Stats`, `${humans} humans\n${botCount} bots\n${usersCount} total members`)
            .addField(`Total Memory Space`, "`32GB`")
            .addField(`Total Memory Used`, "`6GB`")
            .setColor("RANDOM")
            .addField("Coded With", `Language: [NodeJS](https://nodejs.org)\nLibrary: [discord.js@12.2.0](https://discord.js.org/#/)\nCode App: [Visual Studio Code](https://code.visualstudio.com)`)
            .setFooter(`Coded by Mike H.`, bot.user.displayAvatarURL())
        message.channel.send(embed)
    }
}