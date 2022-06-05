const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');


const CharacterRoutes = require('./src/api/characters/character.routes');
const FactionRoutes = require('./src/api/factions/faction.routes');
const UserRoutes = require('./src/api/users/user.routes');


dotenv.config();
const PORT = process.env.PORT || 8080;

const {connectDb} = require('./src/utils/database/database');

const app = express();
app.disable("x-powered-by"); //Oara que no muestre que esta hecho con express
connectDb();
/****************************************************************/
const bp = require('body-parser'); //si no pongo esto el req.body aparece como undefined npm i body-parser --save
app.use(bp.json());
app.use(bp.urlencoded({ extended: true })); 
/************************************************************* */
app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); //Definimos los metodos que permitimos para nuestra API
    res.header('Access-Control-Allow-Credentials', 'true'); //Implementamos el cors para poder conectarnos desde los puertos estandar de ANGULAR Y REACT
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(
    cors({ //Definimos las rutas para las que damos permiso a acceder a nuestra API, para que no la bloquee el CORS
        origin: ['https://localhost:5000', 'https://localhost:8080'],
        credential: true

}));

app.use(express.json({limit: '5mb'})); //Limitamos el tamaño máximo de nuestra petición



app.use('/factions',FactionRoutes);
app.use('/characters',CharacterRoutes);
app.use('/users', UserRoutes);

app.use('/',(req,res) =>{
    console.log('Root');
})

app.use("*", (req, res, next) => {
    //Para las rutas que no estén definidas muestranos un Route not found
    return res.status(404).json("Route not found");
  });
  

  app.use((error, req, res, next) =>{ //Para cualquier error que suceda en la aplicación
      return res.status(error.status || 500).json(error.message || 'Unexpected error');
  });


app.listen(PORT, () =>{
    console.log(`listening in http://localhost:${PORT}`);
})