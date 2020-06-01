module.exports={
    name: "slowmode",
    category:"utility",
    description:"Set the slowmode for the channel!",
    aliases: ['slowm', 'sm'],
    usage: "slowmode <number> every number is a second don't use terms like 1s or 1h instead use 60 for 1 minute etc.",
    run: async(bot,message,args)=>{
        if(!args[0])return message.channel.send(`You did not specify the time in seconds you wish to set this channel's slow mode too!`)
        if(isNaN(args[0]))return message.channel.send(`That is not a number.`)
        let reason = args.slice(1).join(" ")
        if(!args[1]) reason = "No reason provided";
        message.channel.setRateLimitPerUser(args[0],reason)
        message.channel.send(`Set the slowmode of this channel too **${args[0]}**\nReason: ${reason}`)
    }
}
