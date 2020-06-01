const mongoose = require("mongoose");

const GiveawaySchema = new mongoose.Schema({
    guildId: { type: String, required: true},
    messageId: { type: String, required: true},
    channelId: { type: String, required: true},
    title: { type: String, required: true},
    prize: { type: String, required: true},
    winners: { type: Number, required: true},
    createdOn: { type: Date, required: true},
    endsOn: { type: Date, required: true},
    duration: { type: String, required: true},
    host: {type: String, required: true}
});

const Giveaway = module.exports = mongoose.model(`Giveaway`, GiveawaySchema);