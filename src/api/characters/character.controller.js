const Character = require('./character.model');

const getAllCharacters = async(req,res,next) =>{
    try{
        const allCharacters = await Character.find().populate('faction');
        if(allCharacters){
            return res.status(200).json(allCharacters);
        }
        return res.status(404).json('No characters to show');
    }catch(err){
        return next(err);
    }
}

const getCharacterByName = async(req,res,next) =>{
    try{
        const {name} = req.params;
        const nameFound = await Character.find({name: name}).collation({locale: 'en', strength: 2}).populate('faction');
        if(!nameFound.length){
            return res.status(404).json('Character not found');
        }
        return res.status(200).json(nameFound);
    }catch(err){
        return next(err);
    }
}

const createCharacter = async(req,res,next) =>{
     try{
        const newCharacter = new Character(req.body);
         if (!newCharacter.name || !newCharacter.role){ //Comprueba que esten en el req.body los campos obligatorios
            return next(`Character's name and role are required`);
        }
        const nameFound = await Character.find({name:newCharacter.name}).collation({locale: 'en', strength: 2});
        if(nameFound.length){ //La linea de arriba y esta es para comprobar si ya existe el documento para evitar duplicar entradas
            return next(`Character exists`);        
        } 
        const insertCharacter = await newCharacter.save();
        return res.status(200).json(insertCharacter);
    }catch(err){
        return next('el next',err);
    } 
 
}


const updateCharacterById = async(req,res,next) =>{
    try{
        const {id} = req.params;
        const findId = await Character.findById(id);
        if(!findId){
            return next('Id not found');
        }
        const {name} = req.body;
        if(name){ //controla si se pone nombre que no se modifique y coja un nombre ya usado por otro personaje
            const nameRepeated = await Character.find({name: name, _id:id}).collation({locale: 'en', strength:2});
            if(!nameRepeated.length){
                console.log('aqui?')
                return next('Name in use, cant duplicate character');
            }
        }
        const bodyUpdate = new Character(req.body);
        console.log(bodyUpdate);
        bodyUpdate._id = id;
        const updatedCharacter = await Character.findByIdAndUpdate(id, bodyUpdate);
        console.log(updatedCharacter);
        return res.status(200).json(updatedCharacter);
    }catch(err){
        return next(err);
    }
}

const deleteCharacterById = async(req,res,next) =>{
    try{
        const {id} = req.params;
        const deletedCharacter = await Character.findByIdAndDelete(id);
        if(deletedCharacter){
            return res.status(200).json(`Character ${deletedCharacter.name} deleted`);
        }
        const error = new Error('Id not found');
        error.status = 404;
        return next(error);
    }catch(err){
        return next(err);
    }
}









module.exports = {
    getAllCharacters,
    getCharacterByName,
    createCharacter,
    updateCharacterById,
    deleteCharacterById
}