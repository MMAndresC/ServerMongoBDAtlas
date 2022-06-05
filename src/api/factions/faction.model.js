const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const factionSchema = new Schema({
    faction: {type: String, required: true }, 
    description: {type: String}
},
{
    timestamps: true,
});

const Faction = mongoose.model('faction', factionSchema );

module.exports = Faction;