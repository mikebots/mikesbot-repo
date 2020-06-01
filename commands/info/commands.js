const {MessageEmbed} = require("discord.js")
const {version} = require("../../package.json")
module.exports = {
    name: "commands",
    aliases: ['cmd', 'cmds',],
    usage: "[p]commands",
    description: "Get dmed all available commands that this bot has!",
    category: "info",
    run: async(bot,message,args)=>{
        const embed = new MessageEmbed()
        embed.setColor("RANDOM")
        embed.setAuthor(`Help Panel`, message.author.displayAvatarURL({ dynamic: true}))
        embed.setFooter(`Version: v${version}`)
        bot.categories.forEach(cat =>{
            embed.addField(cat[0].toUpperCase() + `${cat.slice(1)} (${bot.commands.filter(cmd => cmd.category == cat).size})`, bot.commands.filter(cmd => cmd.category == cat).map(cmd => `\`${cmd.name}\``).join(", "))

        } )
        return message.channel.send(embed)
    }
}