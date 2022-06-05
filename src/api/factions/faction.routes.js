const express = require('express');
const {
    getAllFactions, 
    findFactionByName, 
    createNewFaction, 
    updateFactionById,
    deleteFactionById
} = require('./faction.controller');

const FactionRoutes = express.Router();

FactionRoutes.get('/', getAllFactions);
FactionRoutes.get('/:faction',findFactionByName);
FactionRoutes.post('/', createNewFaction);
FactionRoutes.put('/:id', updateFactionById);
FactionRoutes.delete('/:id',deleteFactionById);

module.exports = FactionRoutes; 