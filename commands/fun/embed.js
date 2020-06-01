const {MessageEmbed} = require("discord.js") //677340869233344514 < channel id

module.exports={
    name: "embed",
    category: "fun",
    description: "Use this command to embed messages to a current channel!",

    usage: "embed <message>",

    run: async(bot,message,args)=>{
        if(message.deleteable) message.delete();
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You need the `Manage Server` permission in order to make an announcement");
        let Str = args.join(" ")
      if(!args[0])return message.channel.send("You didn't specify your announcement!")
        
           message.channel.send(new MessageEmbed().setDescription(Str).setColor("RANDOM"))
           message.delete()
          
         
          
          
          
        }

}




























