const mongoose = require("mongoose");

const Cases = new mongoose.Schema({
    Guild: { type: mongoose.Schema.Types.Mixed},
    User: { type: mongoose.Schema.Types.Mixed},
    Reason: { type: String, required: true},
    Date: { type: Date, required: true},
    Moderator: { type: mongoose.Schema.Types.Mixed},
    Action: { type: String, required: true},
   CaseNumber: { type: Number, required: true},
   Case: { type: mongoose.Schema.Types.Mixed}

});

const Case = module.exports = new mongoose.model(`cases`, Cases);