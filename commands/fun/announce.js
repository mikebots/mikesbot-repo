const {MessageEmbed} = require("discord.js") //677340869233344514 < channel id
module.exports={
    name: "announce",
    category: "fun",
    description: "Use this command to announce messages to a current channel!",

    usage: ".announce <announcement>",

    run: async(bot,message,args)=>{
        if(message.deleteable) message.delete();
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You need the `Manage Server` permission in order to make an announcement");
        let Str = args.join(" ")
      if(!args[0])return message.channel.send("You didn't specify your announcement!")
        
           message.channel.send(Str)
           message.delete()
          
          
          
         
          
          
          
          
        }

}




























