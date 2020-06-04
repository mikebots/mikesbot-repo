const {readdirSync} = require('fs');

module.exports= (bot)=>{
    readdirSync('./commands/').forEach(category=>{
        const commands = readdirSync(`./commands/${category}/`).filter(file=>file.endsWith('.js'));
        for(let file of commands){
            let command = require(`../commands/${category}/${file}`);
            if(command.name){
                bot.commands.set(command.name, command)
                console.log(`${command.name} has loaded`)
            
                
                
            if(command.aliases && Array.isArray(command.aliases)) command.aliases.forEach(alias => bot.aliases.set(alias, command.name))
        }
            }
            })
    
    
}
