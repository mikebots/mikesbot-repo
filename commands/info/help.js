const {MessageEmbed} = require('discord.js')
const {stripIndents} = require('common-tags')
const ms = require("ms")

const db = require("quick.db")
require("dotenv").config();
module.exports = {
    name: "help",
    category: 'info',
    usage: "help [command]", 
    aliases: ['h'],
    description: "Returns info on commands",
    timeout: 10000,
    run: async (bot, message, args) => {
         const prefix = db.get(`prefix_${message.guild.id}`) || process.env.PREFIX;
        const categories = bot.categories.map(c => `${prefix}help ${c}`).join("\n\n")

        if(!args[0]){
            const embed = new MessageEmbed()
                .setTitle(`Help Panel`)
                .setDescription(`\`\`\`${categories}\`\`\``)
                .setColor("RANDOM")
                .setFooter(`Try ${prefix}help [category] to get more info on a category`, message.author.displayAvatarURL({ dynamic: true}))
            return message.channel.send(embed)

        } else if(args[0]&&bot.categories.includes(args[0].toLowerCase())){
            const commands = bot.commands.filter(c => c.category===args[0].toLowerCase()).map(c => c.name).join(", ")
            const embed = new MessageEmbed()
                .setTitle(`Commands found under: ${args[0]}`)
                .setDescription(`\`${commands}\``)
                .setColor("RANDOM")
                .setFooter(`Try [p]help <command> to get more info on a command!`)
            return message.channel.send(embed)
        } else if(args[0]&&bot.commands.has(args[0].toLowerCase())||bot.aliases.has(args[0].toLowerCase())){
            const input = args[0]
            const hembed = new MessageEmbed()
            const cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));
            let info = `No information found for: **${input.toLowerCase()}**`
            if(!cmd)return message.channel.send(hembed.setColor('RANDOM').setDescription(info));
            if(cmd.name) info = `**Command name**: ${cmd.name}`
            if(cmd.description) hembed.setDescription(cmd.description)
            if(cmd.aliases) hembed.addField(`Aliases`, "`\`\`" + cmd.aliases.map(a=>a).join(', ') + "`\`\`", true)
            if(cmd.category) info = `${cmd.category}:${cmd.name}`
            if(cmd.usage) hembed.addField(`Usage`, "`\`\`" + cmd.usage + "`\`\`", true)
            if(cmd.timeout) hembed.setFooter(`Timeout: ${ms(cmd.timeout)}`)
            hembed.setTitle(info)
            hembed.setColor("RANDOM")
            return message.channel.send(hembed);
            
           
        } else {
            return message.channel.send({embed: {
                description: `No category/command found for: **${args[0].toLowerCase()}**`,
                color: "RANDOM"
            }})
        }




        }
    }