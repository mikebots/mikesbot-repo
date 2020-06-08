const MessageModel = require('../../database/model/message');
let addMemberRole = (emojiRoleMappings, reaction, user) => {
        if(!emojiRoleMappings) return;
        if(emojiRoleMappings.hasOwnProperty(reaction.emoji.id)) {
            let roleId = emojiRoleMappings[reaction.emoji.id];
            let role = reaction.message.guild.roles.cache.get(roleId);
            let member = reaction.message.guild.members.cache.get(user.id);
            if(role && member) {
                member.roles.add(role);
                console.log("yes worked.");
            }
        }
    }
module.exports = async (client, reaction, user) => {
    
    if(reaction.message.partial) {
        await reaction.message.fetch();
        if(user.bot) return;
        let { id } = reaction.message;
        try {
            let msgDocument = await MessageModel.findOne({ messageId: id });
            if(msgDocument) {
                client.cachedMessageReactions.set(id, msgDocument.emojiRoleMappings);
                let { emojiRoleMappings } = msgDocument;
                addMemberRole(emojiRoleMappings, reaction, user);
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    else {
        let emojiRoleMappings = client.cachedMessageReactions.get(reaction.message.id);
        if(user.bot) return;
        addMemberRole(emojiRoleMappings, reaction, user);
    }
}