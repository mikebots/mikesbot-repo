/* const {MessageEmbed} = require("discord.js")
const ms = require("ms")
const {saveGiveaway, scheduleGiveaways} = require('../../utils/structures/giveaway')

const prompts = [
    "Alright lets start this giveaway! Give this giveaway a title!(So your members know what this is about)",
    `Super cool title! What should we giveaway? (Your prize)`,
    `Congrats to advanced on the members that win that prize! Now how long do you want this giveaway to last? (Use time format such as: "1h,1s" etc)`,
    `Perfect amount of time! Now how many winners do you want?`
]
module.exports={
    name: "giveaway",
    description: "Create a giveaway for a channel!",
    usage: "[p]giveaway <channel id/mention/name>",
    category: "fun",
    aliases: ['gcreate', 'giveawayy'],
    run: async(bot,message,args)=>{
        const [id] = args;
        console.log(id)
        const channel = message.guild.channels.cache.get(id) || message.guild.channels.cache.find(c=>c.name==id) || message.mentions.channels.first()

        if(channel){
            try{
               const response = await getResponses(message)
               const embed = new MessageEmbed()
                .setTitle(`Please confirm this giveaway!`)
                .setColor("YELLOW")
                .addField(`Giveaway Title`, response.title)
                .addField(`Giveaway Prize`, response.prize)
                .addField(`Giveaway Time`, response.duration)
                .addField(`Giveaway Winners`, response.winners)
            const msg = await message.channel.send(embed)
            msg.react("👍")
            msg.react("👎")
            const filter = (reaction, user) => ['👍', '👎'].includes(reaction.emoji.name) && !user.bot && user.id === message.author.id;
            const reactions = await msg.awaitReactions(filter, {max: 1, time: 60000, errors: ['time']})
            const choice = reactions.get("👍") || reactions.get('👎');
            if(choice.emoji.name == "👍"){
                console.log("Confirmed Giveaway")
                 response.endsOn = new Date(Date.now() + ms(response.duration));
                const giveawayEmbed = new MessageEmbed()
                               

                    .setTitle(response.title)
                    .setDescription(`**${response.prize[0].toUpperCase() + response.prize.slice(1)}**\n\n\nReact with 🎉 to enter.\nEnds on ${response.endsOn}`)
                    .setColor("#7289da")
                    .setFooter(`${response.winners} winner(s) | Ends On`)
                    .setTimestamp(Date.now() + ms(response.duration))
                const giveawayMsg = await channel.send(`🎉 **Giveaway Time** 🎉`, giveawayEmbed)
                giveawayMsg.react("🎉");
                response.messageId = giveawayMsg.id;
                response.guildId = giveawayMsg.guild.id;
                response.channelId = channel.id;
                response.host = `<@${message.author.id}>`;
                await saveGiveaway(response);
                await scheduleGiveaways(bot, [response])
                const b = new MessageEmbed()
                    .setTitle(`Confirmed The Giveaway!`)
                    .setDescription(`This giveaway is now starting in <#${channel.id}>. [Jump To Giveaway](https://discord.com/channels/${message.guild.id}/${channel.id}/${giveawayMsg.id})`)
                    .setColor("GREEN")
                    .setFooter(`${response.winners} winner(s)`)
                    .setTimestamp()
                msg.edit(b)
                
            } else if(choice.emoji.name === "👎") {
                console.log(`Denied Giveaway`)
                const d = new MessageEmbed()
                    .setTitle(`Looks like we aren't having a giveaway after all..`)
                    .setDescription(`Canceled this giveaway...For now`)
                    .setColor("RED")
                    .setFooter(`Wumpus...cancel the giveaway!`)
                    .setTimestamp()
                msg.edit(d)
            }
            } catch(err){
                console.log(err)
            }
        }
        else{
            message.channel.send(`This channel does not exist! Please try again`)
        }
    }

}
async function getResponses(message) {

    const validTime = /^\d+(s|m|h|d|w)$/;
    const validNumber = /\d+/;
    const responses = { }

    for(let i = 0; i < prompts.length; i++) {
        await message.channel.send(prompts[i]);
        const response = await message.channel.awaitMessages(m=> m.author.id === message.author.id, { max: 1});
        const { content } = response.first();

        if(i ===0) 
            responses.title = content;
        else if(i === 1)
            responses.prize = content;
        else if(i === 2) {
            if(validTime.test(content))
                responses.duration = content;
        else
            throw new Error(`Invalid Time Format`)
            
        }
        else if(i === 3){
            if(validNumber.test(content))
                responses.winners = content;
            else
                throw new Error(`Invalid number for winners`);
               
        }
    }
    return responses;
}*/
