module.exports = {
    name: "leaveguild",
    description: "Make the bot leave a guild with this command!",
    usage: "leave <Guild ID>",
    run: async(bot, message, args)=>{
        if(!args[0]) return message.channel.send(`Please specify a guild id to leave`)
        var botApplication = await bot.fetchApplication();
        var botOwner = botApplication.owner.id
        if(message.author.id !== botOwner) return message.channel.send(`For safety reasons, this is an owner only command!`)

        bot.guilds.cache.get(args[0]).leave().then((guild)=>{
            console.log(`Succesfully left the guild ${guild.name}(${guild.id}) which had ${guild.memberCount} members.`)
        })
        
        

    }
}