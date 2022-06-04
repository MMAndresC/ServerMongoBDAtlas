const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name:{type: String, required: true},
    realName: {type: String},
    age: {type: Number, min: 1, max: 120},
    nationality: {type: String},
    affilation: {type: Schema.Types.ObjectId, ref: 'faction'},
    role: {type: String, required: true},
    image: {type: String, required: true}
},
{
    timestamps: true
});

const Character = mongoose.model('character', characterSchema);

module.exports = Character;