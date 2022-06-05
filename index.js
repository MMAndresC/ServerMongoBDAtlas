const express = require('express');
const FactionRoutes = require('./src/api/affiliation/affiliation.routes');

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 8080;

const {connectDb} = require('./src/utils/database/database');

const app = express();

connectDb();
/****************************************************************/
const bp = require('body-parser'); //si no pongo esto el req.body aparece como undefined npm i body-parser --save
app.use(bp.json());
app.use(bp.urlencoded({ extended: true })); 
/************************************************************* */
app.use('/factions',FactionRoutes);

app.use('/',(req,res) =>{
    console.log('Root');
})

app.use("*", (req, res, next) => {
    //Para las rutas que no estén definidas muestranos un Route not found
    return res.status(404).json("Route not found");
  });
  



app.listen(PORT, () =>{
    console.log(`listening in http://localhost:${PORT}`);
})