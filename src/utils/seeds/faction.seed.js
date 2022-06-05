const mongoose = require('mongoose');
const Faction = require('../../api/factions/faction.model');

const dotenv = require('dotenv'); //Estas 3 lineas es para poder usar la url del DB que esta en .env
dotenv.config();
const urlDb = process.env.DB_URL;


const factions = [
    {
        faction:'Overwatch',
        description:'Los buenos'
    },
    {
        faction:'Talon',
        description:'Los malos'
    },
    {
        faction:'Null Sector',
        description:'Omnicos chunguitos terroristas'
    }
];


mongoose.connect(urlDb,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then( async() =>{
    const existFaction = await Faction.find();

    if(existFaction.length){
        await Faction.collection.drop();
        console.log('Exist database, deleting...');
    }
}).catch((err) =>{
    console.log(`error deleting db ${err}`);
}).then( async() =>{
    await Faction.insertMany(factions)
    console.log('Created faction db');
}).catch((err) =>{
    console.log(`error loading seed ${err}`);
}).finally(()=> mongoose.disconnect()); 






