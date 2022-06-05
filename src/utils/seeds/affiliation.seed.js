const mongoose = require('mongoose');
const Affiliation = require('../../api/affiliation/affiliation.model');

const dotenv = require('dotenv'); //Estas 3 lineas es para poder usar la url del DB que esta en .env
dotenv.config();
const urlDb = process.env.DB_URL;


const affiliations = [
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
    const existAffiliation = await Affiliation.find();

    if(existAffiliation.length){
        await Affiliation.collection.drop();
        console.log('Exist database, deleting...');
    }
}).catch((err) =>{
    console.log(`error deleting db ${err}`);
}).then( async() =>{
    await Affiliation.insertMany(affiliations)
    console.log('Created affiliation db');
}).catch((err) =>{
    console.log(`error loading seed ${err}`);
}).finally(()=> mongoose.disconnect()); 






