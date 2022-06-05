const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const affiliationSchema = new Schema({
    faction: {type: String, required: true }, 
    description: {type: String}
},
{
    timestamps: true,
});

const Affiliation = mongoose.model('affiliation', affiliationSchema );

module.exports = Affiliation;