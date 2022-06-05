const mongoose = require('mongoose');
const Character = require('../../api/characters/character.model');

const dotenv = require('dotenv'); //Estas 3 lineas es para poder usar la url del DB que esta en .env
dotenv.config();
const urlDb = process.env.DB_URL;



//HAY QUE COPIAR LA ID DE FACTION EN AFFILATION , HAY QUE EJECUTAR LA SEED DE AFFILATION ANTES QUE ESTA

const characters = [
    {
        name: 'Mercy',
        realName: 'Angela Ziegler',
        age: 37,
        nationality: 'Swiss',
        faction: '629cf650295db77e5a85adc0',
        role:'Support',
        image:'https://static.wikia.nocookie.net/overwatch_gamepedia/images/d/d2/Mercy-portrait.png/revision/latest?cb=20160620024553'
    },
    {
        name: 'Reinhardt',
        realName: 'Reinhardt Wilhelm',
        age: 61,
        nationality: 'German',
        faction: '629cf650295db77e5a85adc0',
        role: 'Tank',
        image: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/0/07/Reinhardt-portrait.png/revision/latest?cb=20160620013222'
    },
    {
        name: 'Soldier ',
        realName: `John Francis "Jack" Morrison`,
        age: 55,
        nationality: 'American',
        role: 'DPS',
        image: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/e/e0/Soldier76-portrait.png/revision/latest?cb=20160620014955'  
    },
    {
        name: 'Doomfist ',
        realName: `Akande Ogundimu`,
        age: 45,
        nationality: 'Nigerian',
        faction: '629cf650295db77e5a85adc1',
        role: 'DPS',
        image: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/15/Doomfist_Artwork.png/revision/latest?cb=20170927195416'   
    },
    {
        name: 'Moira',
        realName: `Moira O'Deorain`,
        age: 45,
        nationality: 'Irsh',
        faction: '629cf650295db77e5a85adc1',
        role: 'Support',
        image: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/b/b5/Moira.png/revision/latest?cb=20171104021652' 
    },
    {
        name: 'Roadhog',
        realName: 'Mako Rutledge',
        age: 48,
        nationality: 'Australian',
        role: 'Tank',
        image: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/c/ce/Roadhog-Portrait.png/revision/latest/scale-to-width-down/345?cb=20160620014755' 
    }
];

mongoose.connect(urlDb,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then( async() => {
    const existCharacters = await Character.find();
    if(existCharacters.length){
        await Character.collection.drop();
        console.log('Exist db characters, deleting ...');
    }
}).catch((err) =>{
    console.log('Error deleting db characters', err);
}).then( async() => {
    await Character.insertMany(characters);
}).catch((err) => {
    console.log(`Error creating db characters: ${err}`);
}).finally( () => mongoose.disconnect());  

