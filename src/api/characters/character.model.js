const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name:{type: String, required: true},
    realName: {type: String},
    age: {type: Number, min: 1, max: 120},
    nationality: {type: String},
    affiliation: {type: Schema.Types.ObjectId, ref: 'affiliation', required: true},
    role: {type: Schema.Types.ObjectId, required: true},
    image: {type: String, required: true}
},
{
    timestamps: true
});

const Character = mongoose.model('character', characterSchema);

module.exports = Character;