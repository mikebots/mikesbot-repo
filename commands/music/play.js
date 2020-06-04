const { Util } = require('discord.js') 
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const ytdl = require('ytdl-core')
const YoutubeAPI = require('simple-youtube-api')
const youtube = new YoutubeAPI(YOUTUBE_API_KEY)
const { play }  = require("../../handlers/play.js") 
const {MessageEmbed} = require("discord.js")

module.exports = {
  name: "play",
  description: "Play a song/url with this command!",
  usage: "[p]play <song name/url>",
  aliases: ['p', 'music', 'pla'],
  category: "music",
  run: async(bot, message, args)=> {
    if(!args.length) {
      return message.channel.send(`Invalid Arguments, Try: -play <song name/url>`)
    }
    
    const { channel } = message.member.voice;
    
    if(!channel) {
      return message.channel.send(`You must be in a voice channel to play any songs!`)
    }
    
    
    const targetsong = args.join(" ")
    
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const urlcheck = videoPattern.test(args[0])
    
    if(videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.channel.send(`Playlist aren\'t compatible at the moment | Mike`)
    }
    
    
    const serverQueue = message.client.queue.get(message.guild.id);
    
    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    }
    
    let songData = null
    let song = null
    
    if(urlcheck) {
      try {
        songData = await ytdl.getInfo(args[0]);
        song = {
          title: songData.title,
          url: songData.video_url,
          duration: songData.length_seconds
         
        }
        
        
      } catch(error) {
        if(message.include === "copyright") {
          return message.channel.send(`This song is copyrighted.`)
          .catch(console.error)
        } else {
          console.error(error);
        }
      }
    } else {
      try {
        const result = await youtube.searchVideos(targetsong, 1);
        songData = await ytdl.getInfo(result[0].url)
        song = {
          title: songData.title,
          url: songData.video_url,
          duration: songData.length_seconds
         
        };
      } catch(error) {
        console.error(error)
      }
    }
    if(serverQueue) {
      serverQueue.songs.push(song)
      const embed = new MessageEmbed()
            .setTitle(`Enqueing`)
            .setColor("RANDOM")
            .setURL(song.url)
            .setThumbnail(song.url)
            .setDescription(`Enqueing - [${song.title}](${song.url})`)
      return serverQueue.textChannel.send(embed)
      .catch(console.error)
    } else {
      queueConstruct.songs.push(song);
    }
    
    if(!serverQueue) message.client.queue.set(message.guild.id, queueConstruct)
    
    if(!serverQueue) {
      try {
        queueConstruct.connection = await channel.join();
        play(queueConstruct.songs[0], message);
        
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send({embed: {"description": `Falied to join the voice channel: ${error}`, "color": "RANDOM"}}).catch(console.error)
      }
    }
    
    
  }
}
