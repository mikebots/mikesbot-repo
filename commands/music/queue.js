const {MessageEmbed} = require('discord.js')
module.exports = {
  name: "queue",
  description: "Get the queued songs",
  aliases: ['q', 'que'],
  category: "music",
  usage: "[p]queue",
  run: async(bot, message, args)=> {
    
    const { channel } = message.member.voice;
    
    if(!channel) {
      return message.channel.send(`You must be in a voice channel to view the queue of the songs!`)
    }
     const serverQueue = message.client.queue.get(message.guild.id)
    
    if(!serverQueue) {
      return message.channel.send(`There isn\'t anything playing at the moment. Play a song and try again :)`)
    }
    
    var embed = new MessageEmbed()
    embed.setTitle(`Server queue for ${message.guild.name}`)
    embed.setColor(`RANDOM`)
    embed.setDescription(`${serverQueue.songs.map((song, index) => index + 1 + ' - ' + `[${song.title}](${song.url})`).join("\n\n")}`, {split: true})
    message.channel.send(embed)
    
  }
}