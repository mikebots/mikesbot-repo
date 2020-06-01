const Genius = new (require("genius-lyrics"))("ev5gw83tqnLf3zQE8b58gxTJFp8P68jl95TjQeIWdZ1tZuJsb1TFMWXMYB4_hYj1")
const {MessageEmbed} = require('discord.js')

module.exports = {
  name: "lyrics",
  aliases: ['lyric'],
  usage: "[p]lyrics",
  category: "music",
  description: "Get the lyrics of a song!",
  run: async(bot, message, args) => {
    
    const { channel } = message.member.voice;
    
    if(!channel) {
      return message.channel.send(`You must be in a voice channel in order to get the lyrics of a song! :)`)
    }
    
    const serverQueue = message.client.queue.get(message.guild.id)
    
    if(!serverQueue) {
      return message.channel.send(`There isn\'t anything playing at the moment. Play a song and try again :)`)
    }
    let m = await message.channel.send("Getting the lyrics!...")
    Genius.tracks.search(serverQueue.songs[0].title)
    .then(results => {
      const song = results[0]
      song.lyrics()
      .then(lyrics => {
        if(lyrics.length > 4095) {
          return message.channel.send(`Looks like the lyrics are above 4095 characters. I cannot paste them sorry :(`)
        }
        if(lyrics.length < 2048) {
          var lyricsEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(lyrics.trim())
           return m.edit('', lyricsEmbed)
        }

        
        
      })
    }).catch(err => message.channel.send(`Looks like there aren\'t any lyrics for this song :(`))
    
    
    
    
  }
}