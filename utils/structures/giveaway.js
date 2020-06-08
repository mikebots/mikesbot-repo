const Giveaway = require("../../database/model/Giveaway");
const schedule = require("node-schedule")
const {MessageEmbed} = require("discord.js")
async function saveGiveaway(response) {
    const {
        title, prize, winners, duration, guildId, messageId, channelId, endsOn, host
    } = response;

    const giveaway = new Giveaway({
        title,
        prize, 
        winners,
        duration, 
        guildId, 
        messageId, 
        channelId, 
        endsOn,
        host,
        createdOn: new Date(),
    });
    return giveaway.save();
}

async function scheduleGiveaways(client, giveaways) {
    for( let i =0; i < giveaways.length; i++) {
        const { channelId, messageId, endsOn, prize, host } = giveaways[i];
        console.log('Scheduling job for ' + endsOn);
        schedule.scheduleJob(endsOn, async () => {
            const channel = await client.channels.fetch(channelId)
            if (channel) {
                const message = await channel.messages.fetch(messageId);

                if(message) {
                    const { embeds, reactions} = message;
                    const reaction = reactions.cache.get("🎉");
                    const users = await reaction.users.fetch();
                    const entries = users.filter(user => !user.bot).array();
                    const winner = entries[0];

                    if(embeds.length === 1){
                        const embed = embeds[0];
                        let winners = determineWinners(entries, giveaways[i].winners)
                        winners = winners.map(user => user.toString()).join(', ')
                        embed.setTitle(`This giveaway has now ended!`)
                        embed.setDescription(`${prize}\n\n\nWinner(s): ${winners}\nHost: ${host}`)
                        embed.setColor(embed.color)
                        embed.setFooter(`This giveaway ended at`)
                        embed.setTimestamp()
                        const v = new MessageEmbed()
                        v.setDescription(`[Giveaway Link](https://discord.com/channels/${message.guild.id}/${channelId}/${message.id})`)
                        v.setColor(embed.color)
                        await message.edit(embed)
                        await message.channel.send(`Congrats ${winners} you won the giveaway for **${prize}**!`, v)
                    }
                }
            }
        })
    }
}
function determineWinners(users, max) {
    if(users.length <= max) return users;
    const numbers = new Set();
    const winnersArray = [];
    let i = 0;
    while (i < max) {
        const random = Math.floor(Math.random() * users.length);
        const selected = users[random];
        if(!numbers.has(random)) {
            winnersArray.push(selected);
            i++;
        }
    }
    return winnersArray;
}



module.exports = {
    saveGiveaway,
    scheduleGiveaways
}
//25:36