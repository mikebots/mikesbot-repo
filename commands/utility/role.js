const {MessageEmbed} = require('discord.js')
module.exports={
    name: "role",
    description: "Create/delete a role with this command!",
    usage: "[p]role create <Role Name> <#Some role color>\n[p]role delete <SomeRoleName/RoleMention>\n[p]role add <Member Mention, Tag, ID> <Role Name, mention, id>\n[p]role remove <Member Mention,Tag,ID> <Role Mention,Name,ID>",
    category: "utility",
    aliases: ['r'],
    run: async(bot,message,args)=>{
        if(!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send(`You don't have the manage roles permission ticked on your role in order for you to execute this command. Error`)
       if(!message.guild.me.permissions.has("MANAGE_ROLES")) return message.channel.send(`I need the manage roles permission in order to execute this command.`)
        if(!args[0]) return message.channel.send(`Please specify whether to add/create/delete/remove a role.`)
        if(args[0].toLowerCase()=='create'){
            let rName = args.slice(1).join(" ")
            let rColor;
            args.forEach(arg=>{
                if(arg.startsWith("#")){
                    rColor=arg
                }
            })
            if(!rName){
                return message.channel.send("You didn't give me a role name :sad:")
            }
            if(!rColor){
                return message.channel.send(`You didn't give me a role color`)
            }
            
        if(rColor>=16777215)return message.channel.send(`exceeding the maximum color #. Keep it between 0 and 1677214`)
        rName=rName.replace(`${rColor}`,``)
        if(rColor<=0)return message.channel.send(`That color range was too small! Sorry but keep it between 0 and 1677214`)
        rName=rName.replace(`${rColor}`,``)
        let rNew = await message.guild.roles.create({
            data:{
                name: rName,
                color: rColor,
            }

        })
        const Embed = new MessageEmbed();
        Embed.setTitle(`New Role Created!`)
        Embed.setDescription(`${message.author.tag} has created a role`)
        Embed.addField(`Role Name`, `"**${rName}**"`)
        Embed.addField(`Role Color`, `Hex Code: ${rColor}`)
        Embed.addField(`Role ID`, `${rNew.id}`)
        Embed.setColor(rColor)
        Embed.setFooter(`Role Created At`)
        Embed.setTimestamp();
        Embed.setThumbnail(message.author.displayAvatarURL())
        message.channel.send(Embed)
    }else if(args[0].toLowerCase()=='delete'){
        
        
        let roleDelete = message.guild.roles.cache.get(args[1])||message.guild.roles.cache.find(r=>r.name==args.slice(1).join(" ")) || message.mentions.roles.first()
        if(typeof roleDelete == "undefined")return message.channel.send(`Error while trying to delete the role. If the error keeps continuing, make sure to check for valid spelling,caps,formatting,gramatical errors. Otherwise restart the client.`)
     
        if(roleDelete.position > message.member.roles.highest.position&&message.member.user.id !== message.guild.ownerID) return  message.channel.send(`This role is higher than you I cannot delete it sorry. `)
        if(roleDelete.position > message.guild.me.roles.highest.position&&message.member.user.id !== message.guild.ownerID) return  message.channel.send(`This role is higher than me I cannot delete it sorry. `)
        
          await roleDelete.delete()
        const deleteembed = new MessageEmbed();
        deleteembed.setTitle("Role Deleted")
        deleteembed.setDescription(`${message.author.tag} deleted the role "**${roleDelete.name}**"`)
        deleteembed.addField(`Deleted Role ID`, `${roleDelete.id}`)
        deleteembed.addField(`Deleted Role Color`, `#${roleDelete.color}`)
        deleteembed.setColor(roleDelete.color)
        deleteembed.setFooter(`Role deleted at`)
        deleteembed.setThumbnail(message.author.displayAvatarURL())
        deleteembed.setTimestamp();
        message.channel.send(deleteembed)
        message.author.send(`Deleted Role ID: ${roleDelete.id}`)
    }else if(args[0].toLowerCase()=='add'){
        if(!args[1]) return message.channel.send("Please specify a guild member.")
        let role = message.guild.roles.cache.get(args[2])||message.guild.roles.cache.find(r=>r.name==args.slice(2).join(" "))||message.mentions.roles.first()
        if(!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send(`You need the manage roles permissions in order to execute this command!`)
        
        if(!args[2]) return message.channel.send(`No role specified`)
        var member = message.guild.members.cache.get(args[1]) || message.mentions.members.first()||message.guild.members.cache.find(u=>u.tag==args[1])

        
        if(typeof role === "undefined") return message.channel.send(`Looks like this role doesn't exist.`)
        if(role.managed) return message.channel.send("I cannot role someone an integration!")

        if(role.position >= message.member.roles.highest.position) return message.channel.send("This role is above/equal to you I canot assign it to anyone!")
        if(role.position >= message.guild.me.roles.highest.position) return message.channel.send(`This role is above\equal to than me! I cannot assign it to anyone.`)
        
        await member.roles.add(role).then(()=>{
            message.channel.send(`Succesfully added the role ${role.name} to ${member.user.tag}!`)
        })
        .catch(err => {
            message.channel.send(`Oops an error has occured! \`${err}\` .`)
            console.log(err)
        })
    } else if(args[0].toLowerCase()=='remove'){
        if(!args[1]) return message.channel.send("Please specify a guild member.")
        let role = message.guild.roles.cache.get(args[2])||message.guild.roles.cache.find(r=>r.name==args.slice(2).join(" "))||message.mentions.roles.first()
        if(!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send(`You need the manage roles permissions in order to execute this command!`)
        if(!args[2]) return message.channel.send(`No role specified`)
        var member = message.guild.members.cache.get(args[1]) || message.mentions.members.first()||message.guild.members.cache.find(u=>u.tag==args[1])

        
        if(!role) return message.channel.send(`You need to specify a role to remove!`)
        if(role.managed) return message.channel.send("I cannot remove an integration from someone")

        if(role.position >= message.member.roles.highest.position) return message.channel.send("This role is above/equal to you I canot remove it from  anyone!")
        if(role.position >= message.guild.me.roles.highest.position) return message.channel.send(`This role is above/equal to than me! I cannot remove it from anyone.`)
        
        await member.roles.remove(role).then(()=>{
            message.channel.send(`Succesfully removed the role ${role.name} to ${member.user.tag}!`)
        })
        .catch(err => {
            message.channel.send(`Oops an error has occured! \`${err}\` .`)
            console.log(err)
        })
    }
}}