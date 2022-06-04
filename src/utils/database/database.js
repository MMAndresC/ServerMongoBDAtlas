const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const urlDb = process.env.DB_URL;

const connectDb = async() =>{
    try{
        const db = await mongoose.connect(urlDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const { name, host } = db.connection;
        console.log(`Connected with db name: ${name} in host: ${host}`);    
    }
    catch(err){
        console.log('Error al conectar a la DB', err);
    }
}

module.exports = { connectDb };