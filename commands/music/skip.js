module.exports = {
    name: "skip",
    description:"Skip a song",
    aliases: ['ski', 'remove'],
    usage: "[p]skip",
    category: "music",
    run: async(bot, message, args) => {
      
      
      const { channel } = message.member.voice;
      
      if(!channel) {
        return message.channel.send(`You must be in a voice channel in order to skip the queue! :)`)
      }
      
      const serverQueue = message.client.queue.get(message.guild.id)
      
      if(!serverQueue) {
        return message.channel.send(`There isn\'t anything playing at the moment. Play a song and try again :)`)
      }
      
      
      serverQueue.connection.dispatcher.end()
      message.channel.send(`Song Skipped!`)
      
      
      
      
      
      
      
      
      
      
      
      
    }
  }
