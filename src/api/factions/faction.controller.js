
const Faction = require('./faction.model');

const getAllFactions = async(req,res,next) =>{
    try{
        const total = await Faction.find();
        return res.status(200).json(total);
        
    }catch(err){
        return next(err);
    }
}

const findFactionByName = async(req,res,next) =>{
    try{
        const {faction} = req.params;
        const result = await Faction.find({faction: faction}).collation({locale: 'en',strength:2}); //collation es para case insesitive       
        if(result.length){
            return res.status(200).json(result);
        }else{
            return res.status(400).json('No existe esa faccion');
        }    
    }catch(err){
        return next(err);
    }
}

const createNewFaction = async(req,res,next) =>{ //No funcionaba, graba uno vacio, req.body aparece vacio
    try{
        const newFaction = new Faction(req.body);
        if(!newFaction.faction){
            return next('Faction is required');
        }
        const factionFind = await Faction.find({faction: newFaction.faction}).collation({locale: 'en', strength: 2});
        if(factionFind.length){
            return next('Faction already exists');
        }
        const factionDB = await newFaction.save();
        return res.status(201).json(factionDB);
    }catch(err){
        return next(err);
    }
}

const updateFactionById = async(req,res,next) =>{
    try{
        const {id} = req.params;
        const bodyUpdate = new Faction(req.body);
        bodyUpdate._id = id; //Hay que añadir al registro el id
        const updateFaction = await Faction.findByIdAndUpdate(id, bodyUpdate);
        if(updateFaction){
           return res.status(200).json(updateFaction); 
        }else{
            const err = new Error;
            err.status = 404;
            err.message = (`id doesn't exist`);
            return next(err);
        }
        
    }catch(err){
        return next(err);
    }
}

const deleteFactionById = async(req,res,next) =>{
    try{
        const {id} = req.params;
        const deletedFaction =await Faction.findByIdAndDelete(id)
        if(!deletedFaction){
            const err = new Error;
            err.status = 404;
            return next(`document doesnt exist`,err);
        }
        return res.status(200).json(`Faction ${deletedFaction.faction} deleted`);
    }catch(err){
        return next('el del next', err); 
    }
}   




module.exports = {
    getAllFactions, 
    findFactionByName, 
    createNewFaction, 
    updateFactionById, 
    deleteFactionById
};