const {MessageEmbed} = require('discord.js')
const db = require("quick.db")
const Discord = require("discord.js")

module.exports = async(bot, member)=>{
    let channel = db.get(`welcomechannel_${member.guild.id}`);

    if(channel == null&&!channel)return;

    let messages = [
        `${member.user.username} just joined wassuhhh`,
        `${member.user.tag} just joined ${member.guild.name}, very epic`,
        `${member.user.username} is here to kick butt and chew bubblegum, and they\'re all outta gum`,
        `${member.guild.name} just got another member! [${member.user.username}]`,
        `${member.user.tag}, Welcome to ${member.guild.name}`,
        `${member.user.tag} just joined. This server now has ${member.guild.members.cache.size} members!`
    ]
    let isCheck = db.get(`welmesset_${member.guild.id}`)
    if(isCheck==false&&!isCheck) return;
    var welmess = db.get(`welmess_${member.guild.id}`)
    if(welmess==null || !welmess) return;

    if(welmess.includes("(member.tag)"))
    welmess = welmess.replace("(member.tag)", member.user.tag)
    if(welmess.includes("(member.username)"))
    welmess = welmess.replace("(member.username)", member.user.username)
    if(welmess.includes("(member.mention)"))
    welmess = welmess.replace("(member.mention)", member.toString())
    if(welmess.includes("(member.id)"))
    welmess = welmess.replace("(member.id)", member.user.id)
    if(welmess.includes("(guild.name)"))
    welmess = welmess.replace("(guild.name)", member.guild.name)
    if(welmess.includes("(guild.id)"))
    welmess = welmess.replace("(guild.id)", member.guild.id)
    if(welmess.includes("(member.discriminator)"))
    welmess = welmess.replace("(member.discriminator)", member.user.discriminator)
    
    var defaultEmbed = db.get(`defaultmsg_${member.guild.id}`)
    var isCanvas = db.get(`welcomecardon_${member.guild.id}`)
    var canvBack = db.get(`welcomecard_${member.guild.id}`)
    let msg = messages[Math.floor(Math.random()*(messages.length))]
    let embed = new MessageEmbed()
    var isEmbed = db.get(`embedmsg_${member.guild.id}`)

   embed.setDescription(welmess)
   embed.setColor("RANDOM")
   embed.setFooter("Joined at")
   embed.setTimestamp(member.joinedAt)
   var defEmbed = new MessageEmbed()
   defEmbed.setTitle(`${member.user.tag}`)
   defEmbed.setFooter("Joined at")
   defEmbed.setDescription(msg)
   defEmbed.setThumbnail(member.user.displayAvatarURL())
   defEmbed.setTimestamp(member.joinedAt)
    defEmbed.setColor("RANDOM")
   

   if(isEmbed==true&&defaultEmbed==false){
    
   member.guild.channels.cache.get(channel).send(embed)
   
   
   }else if(isEmbed==true&&defaultEmbed==true){
       member.guild.channels.cache.get(channel).send(defEmbed)
   } else if(isEmbed==false&&defaultEmbed==true){
       member.guild.channels.cache.get(channel).send(msg)
   }else if(isEmbed==false&&defaultEmbed==false){
    member.guild.channels.cache.get(channel).send(welmess)
   }
}