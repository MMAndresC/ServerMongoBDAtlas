const express = require('express');

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 8080;

const {connectDb} = require('./src/utils/database/database');

const app = express();

connectDb();



app.use('/',(req,res) =>{
    console.log('Root');
})

app.listen(PORT, () =>{
    console.log(`listening in http://localhost:${PORT}`);
})